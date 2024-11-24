export type ApiResponse<T> = {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: {
    readonly code: string;
    readonly message: string;
  };
};

export type RenderJobStatus = 'pending' | 'processing' | 'finished' | 'error';
