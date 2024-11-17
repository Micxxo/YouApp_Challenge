export type servicesParams = {
  enabled: boolean;
};

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface ProfilePostProps {
  username?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  interests?: Array<string>;
}
