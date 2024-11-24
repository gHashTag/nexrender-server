// types/template.types.ts
export type TemplateConfig = {
  readonly name: string;
  readonly composition: string;
  readonly outputModule: string;
  readonly outputExt: string;
  readonly settingsTemplate: string;
};

export type TemplateAssets = {
  readonly videos: readonly AssetConfig[];
  readonly images: readonly AssetConfig[];
  readonly audio: readonly AssetConfig[];
  readonly text: readonly TextAssetConfig[];
};

type AssetConfig = {
  readonly layerName: string;
  readonly path: string;
  readonly composition?: string;
};

type TextAssetConfig = {
  readonly layerName: string;
  readonly property: string;
  readonly defaultValue: string;
  readonly composition?: string;
};
