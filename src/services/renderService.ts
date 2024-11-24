import { join } from "path";
import { CONFIG } from "../config/constants";
import { Asset, Job } from "../types/job.types";
import { TemplateAssets } from "../types/template.types";
import { ensureDirectories } from "../utils/fileUtils";
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
    process.cwd(),
    "src",
    CONFIG.paths.templates,
    templateName
  );
  const outputDir = join(process.cwd(), "output");

  ensureDirectories([outputDir]);

  const configPath = join(templateDir, "config");
  const { config, assets } = await import(configPath);

  const aepPath = join(templateDir, `${config.name}.aep`);
  const outputPath = join(outputDir, `${templateName}.mp4`);

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
