// Интерфейсы
export type Asset = {
  readonly type: string;
  readonly src?: string;
  readonly layerName?: string;
  readonly composition?: string;
  readonly property?: string;
  readonly value?: string;
};

export type Job = {
  readonly template: {
    readonly src: string;
    readonly composition: string;
    readonly outputModule: string;
    readonly outputExt: string;
    readonly settingsTemplate: string;
  };
  readonly assets: readonly Asset[];
  readonly actions: {
    readonly postrender: ReadonlyArray<{
      readonly module: string;
      readonly preset: string;
      readonly output: string;
    }>;
  };
};

export type Template = {
  readonly src: string;
  readonly composition: string;
  readonly outputModule: string;
  readonly outputExt: string;
  readonly settingsTemplate: string;
};
