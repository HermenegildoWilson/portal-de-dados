#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <Adafruit_BME680.h>

/* =====================================================
   CONFIGURAÇÕES GERAIS
   ===================================================== */

// Wi-Fi
constexpr const char* WIFI_SSID     = "hermenegildowilson7";
constexpr const char* WIFI_PASSWORD = "wilsonPanzo";

// API
constexpr const char* API_URL = "http://10.19.161.236:3000/api/sensors/data";

// Identificação do sensor
constexpr const char* SENSOR_ID = "esp32_01";

// Pinos I2C
constexpr uint8_t I2C_SDA = 18;
constexpr uint8_t I2C_SCL = 19;

/* =====================================================
   LIMITES DE MUDANÇA SIGNIFICATIVA
   ===================================================== */

constexpr float TEMP_THRESHOLD        = 0.5;   // °C
constexpr float HUM_THRESHOLD         = 2.0;   // %
constexpr float PRESSURE_THRESHOLD    = 1.0;   // hPa
constexpr float AIR_QUALITY_THRESHOLD = 10.0;  // kΩ

/* =====================================================
   OBJETO GLOBAL
   ===================================================== */

Adafruit_BME680 bme;

/* =====================================================
   ESTRUTURAS
   ===================================================== */

struct SensorData {
  float temperature;
  float humidity;
  float pressure;
  float airQuality;
};

SensorData lastSentData;
bool hasSentOnce = false;

/* =====================================================
   FUNÇÕES AUXILIARES
   ===================================================== */

void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando ao Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWi-Fi conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

bool initBME680() {
  Wire.begin(I2C_SDA, I2C_SCL);

  if (!bme.begin()) {
    Serial.println("Erro: BME680 não detectado.");
    return false;
  }

  // Configurações recomendadas
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150);

  Serial.println("BME680 inicializado com sucesso.");
  return true;
}

bool readSensors(SensorData& data) {
  if (!bme.performReading()) {
    Serial.println("Erro ao ler BME680.");
    return false;
  }

  data.temperature = bme.temperature;
  data.humidity    = bme.humidity;
  data.pressure    = bme.pressure / 100.0;
  data.airQuality  = bme.gas_resistance / 1000.0;

  return true;
}

bool hasSignificantChange(const SensorData& current, const SensorData& last) {
  Serial.println("temperature: " + String(last.temperature, 2));
  Serial.println("humidity: " + String(last.humidity, 2));
  Serial.println("pressure: " + String(last.pressure, 2));
  Serial.println("air_quality: " + String(last.airQuality, 2));

  return
    abs(current.temperature - last.temperature) >= TEMP_THRESHOLD ||
    abs(current.humidity    - last.humidity)    >= HUM_THRESHOLD ||
    abs(current.pressure    - last.pressure)    >= PRESSURE_THRESHOLD ||
    abs(current.airQuality  - last.airQuality)  >= AIR_QUALITY_THRESHOLD;
}

void sendDataToServer(const SensorData& data) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wi-Fi desconectado. Dados não enviados.");
    return;
  }

  HTTPClient http;
  http.begin(API_URL);
  http.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"sensor_id\":\"" + String(SENSOR_ID) + "\",";
  payload += "\"temperature\":" + String(data.temperature, 2) + ",";
  payload += "\"humidity\":"    + String(data.humidity, 2) + ",";
  payload += "\"pressure\":"    + String(data.pressure, 2) + ",";
  payload += "\"air_quality\":" + String(data.airQuality, 2);
  payload += "}";

  int responseCode = http.POST(payload);

  Serial.print("HTTP Response: ");
  Serial.println(responseCode);

  http.end();
}

/* =====================================================
   SETUP
   ===================================================== */

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("Inicializando sistema...");

  initBME680();
  connectWiFi();
}

/* =====================================================
   LOOP
   ===================================================== */

void loop() {
  SensorData currentData;

  if (!readSensors(currentData)) {
    delay(2000);
    return;
  }

  if (!hasSentOnce || hasSignificantChange(currentData, lastSentData)) {
    sendDataToServer(currentData);

    lastSentData = currentData;
    hasSentOnce = true;

    Serial.println("Dados enviados (mudança significativa).");
  } else {
    Serial.println("Sem mudança significativa. Envio ignorado.");
  }

  delay(2000);
}