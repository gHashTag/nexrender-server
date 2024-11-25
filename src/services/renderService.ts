import { join } from "path";
import { existsSync } from "fs";
import { CONFIG } from "../config/constants";
import { Asset, Job } from "../types/job.types";
import { TemplateAssets } from "../types/template.types";

import { createFileUrl } from "./fileService";

export const formatAssets = (assets: TemplateAssets): readonly Asset[] => [
  ...assets.videos.map((video) => ({
    type: "video" as const,
    src: createFileUrl(video.path),
    layerName: video.layerName,
    composition: video.composition,
  })),
  ...assets.images.map((image) => ({
    type: "image" as const,
    src: createFileUrl(image.path),
    layerName: image.layerName,
    composition: image.composition,
  })),
  ...assets.audio.map((audio) => ({
    type: "audio" as const,
    src: createFileUrl(audio.path),
    layerName: audio.layerName,
  })),
  ...assets.text.map((text) => ({
    type: "data" as const,
    layerName: text.layerName,
    property: text.property,
    value: text.defaultValue,
    composition: text.composition,
  })),
];

export const createRenderJob = async (
  templateName: string,
  customAssets?: Partial<TemplateAssets>
): Promise<Job> => {
  const templateDir = join(
    CONFIG.paths.base,
    "src",
    CONFIG.paths.templates,
    templateName
  );
  const outputDir = join(CONFIG.paths.base, CONFIG.paths.output);

  const configPath = join(templateDir, "config.ts");
  const { config, assets } = await import(configPath);

  // Используем путь к .aep файлу из конфига
  const aepPath = config.aepPath;
  const outputPath = join(outputDir, `${templateName}.mp4`);

  // Проверяем существование .aep файла
  if (!existsSync(aepPath)) {
    throw new Error(`AEP file not found at: ${aepPath}`);
  }

  return {
    template: {
      ...config,
      src: createFileUrl(aepPath),
      output: outputPath,
    },
    assets: formatAssets({
      ...assets,
      ...customAssets,
    }),
  };
};
