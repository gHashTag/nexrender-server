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
};

export type Template = {
  readonly src: string;
  readonly composition: string;
  readonly outputModule: string;
  readonly outputExt: string;
  readonly settingsTemplate: string;
  readonly output?: string;
  readonly params?: {
    readonly '-acodec'?: string;
    readonly '-ab'?: string;
    readonly '-ar'?: string;
    readonly '-vcodec'?: string;
    readonly '-r'?: string;
    readonly '-y'?: string;
    readonly [key: string]: string | undefined;
  };
};
