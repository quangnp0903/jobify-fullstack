type ResponseErr = {
  data?: {
    msg?: string;
  };
};

export type HttpError<D = unknown> = {
  status?: number;
  message: string;
  data?: D;
  response?: D;
};

export type ApiError = HttpError<ResponseErr>;
