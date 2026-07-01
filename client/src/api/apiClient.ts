import api from "./api";

interface SuccessEnvelope<T> {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}

const unwrap = <T>(envelope: SuccessEnvelope<T>, dataKey: string): T => {
  return envelope[dataKey] as T;
};

export const apiGet = async <T>(url: string, dataKey: string): Promise<T> => {
  const { data } = await api.get<SuccessEnvelope<T>>(url);
  return unwrap<T>(data, dataKey);
};

export const apiPost = async <T, P = unknown>(
  url: string,
  payload: P,
  dataKey: string,
): Promise<T> => {
  const { data } = await api.post<SuccessEnvelope<T>>(url, payload);
  return unwrap<T>(data, dataKey);
};

export const apiPut = async <T, P = unknown>(
  url: string,
  payload: P,
  dataKey: string,
): Promise<T> => {
  const { data } = await api.put<SuccessEnvelope<T>>(url, payload);
  return unwrap<T>(data, dataKey);
};

export const apiDelete = async <T = { message: string }>(
  url: string,
  dataKey?: string,
): Promise<T> => {
  const { data } = await api.delete<SuccessEnvelope<T>>(url);
  return dataKey ? unwrap<T>(data, dataKey) : (data as unknown as T);
};
