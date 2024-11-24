export type RenderServiceOptions = {
  readonly skipCleanup?: boolean;
  readonly debug?: boolean;
  readonly binary?: string;
};

export type VideoServiceOptions = {
  readonly duration?: number;
  readonly quality?: string;
};
