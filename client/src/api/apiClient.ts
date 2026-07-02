import api from "./api";

interface SuccessEnvelope {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}

const unwrap = <T>(envelope: SuccessEnvelope, dataKey: string): T => {
  return envelope[dataKey] as T;
};

export const apiGet = async <T>(url: string, dataKey: string): Promise<T> => {
  const { data } = await api.get<SuccessEnvelope>(url);
  return unwrap<T>(data, dataKey);
};

export const apiPost = async <T, P = unknown>(
  url: string,
  payload: P,
  dataKey: string,
): Promise<T> => {
  const { data } = await api.post<SuccessEnvelope>(url, payload);
  return unwrap<T>(data, dataKey);
};

export const apiPut = async <T, P = unknown>(
  url: string,
  payload: P,
  dataKey: string,
): Promise<T> => {
  const { data } = await api.put<SuccessEnvelope>(url, payload);
  return unwrap<T>(data, dataKey);
};

export const apiDelete = async <T = { message: string }>(
  url: string,
  dataKey?: string,
): Promise<T> => {
  const { data } = await api.delete<SuccessEnvelope>(url);
  return dataKey ? unwrap<T>(data, dataKey) : (data as unknown as T);
};
