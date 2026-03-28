// sensors.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import CreateSensorReadingDto from './dto/create-sensorreading.dto';

interface ClientMeta {
  sensorIds: string[];
}

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class SensorsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Map de controlo: clientId → metadados (salas em que está)
  private clients = new Map<string, ClientMeta>();

  async handleConnection(client: Socket) {
    // Exemplo: o frontend envia os sensores que o utilizador pode ver
    // via query param ou handshake auth
    const sensorIds = this.parseSensorIds(client);

    this.clients.set(client.id, { sensorIds });

    // Entrada automática nas salas
    for (const id of sensorIds) {
      await client.join(`sensor:${id}`);
    }

    console.log(
      `Cliente ${client.id} entrou nas salas:`,
      sensorIds.map((id) => `sensor:${id}`),
    );
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    console.log(`Cliente ${client.id} desconectado`);
  }

  // Permite ao cliente subscrever/abandonar sensores em runtime
  @SubscribeMessage('subscribe-sensor')
  async handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() sensorId: string,
  ) {
    const meta = this.clients.get(client.id);
    if (!meta) return;

    await client.join(`sensor:${sensorId}`);
    if (!meta.sensorIds.includes(sensorId)) {
      meta.sensorIds.push(sensorId);
    }
  }

  @SubscribeMessage('unsubscribe-sensor')
  async handleUnsubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() sensorId: string,
  ) {
    const meta = this.clients.get(client.id);
    if (!meta) return;

    await client.leave(`sensor:${sensorId}`);
    meta.sensorIds = meta.sensorIds.filter((id) => id !== sensorId);
  }

  // Chamado pelo SensorService quando um sensor muda de estado
  emitSensorUpdate(sensorId: string, payload: CreateSensorReadingDto) {
    this.server.to(`sensor:${sensorId}`).emit('sensor:update', payload);
  }

  // Utilitário: quem está em que sala
  getConnectedClients() {
    return [...this.clients.entries()].map(([id, meta]) => ({
      clientId: id,
      sensors: meta.sensorIds,
    }));
  }

  private parseSensorIds(client: Socket): string[] {
    // Podes vir do handshake auth, query, ou JWT decoded
    const raw = client.handshake.query['sensors'];
    if (!raw) return [];
    return Array.isArray(raw) ? raw : raw.split(',');
  }
}
