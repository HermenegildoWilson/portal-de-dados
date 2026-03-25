import { api } from "@/config/api";
import type CreateSensorDto from "./types";
import type { UpdateSensorDto } from "./types";

const create = async (data: CreateSensorDto) => {
  try {
    const response = await api.post("/sensor", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      ...(error.response?.data || error),
    };
  }
};

const find = {
  one: async (id: string) => {
    try {
      const response = await api.get(`/sensor/${id}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        ...(error.response?.data || error),
      };
    }
  },
  all: async () => {
    try {
      const response = await api.get(`/sensor`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        ...(error.response?.data || error),
      };
    }
  },
};

const update = async (props: { id: string; data: UpdateSensorDto }) => {
  const { data, id } = props;
  try {
    const response = await api.patch(`/sensor/${id}`, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      ...(error.response?.data || error),
    };
  }
};

export const sensorService = {
  create,
  find,
  update,
};
