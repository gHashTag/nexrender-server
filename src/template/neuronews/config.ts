import { join } from "path";
import { TemplateAssets, TemplateConfig } from "../../types/template.types";

const baseDir = process.cwd();
const assetsDir = join(baseDir, "src", "template", "neuronews", "Assets");

export const config: TemplateConfig = {
  name: "news",
  composition: "Instagram_Story",
  outputModule: "H.264 - Match Render Settings - 15 Mbps",
  outputExt: "mp4",
  settingsTemplate: "Best Settings",
};

export const assets: TemplateAssets = {
  videos: [
    {
      layerName: "Video_01",
      path: join(assetsDir, "sourceVideoPath.mp4"),
    },
    {
      layerName: "BG_01",
      path: join(assetsDir, "bg-video01.mp4"),
    },
    {
      layerName: "BG_02",
      path: join(assetsDir, "bg-video02.mp4"),
    },
    {
      layerName: "BG_03",
      path: join(assetsDir, "bg-video03.mp4"),
    },
    {
      layerName: "BG_04",
      path: join(assetsDir, "bg-video04.mp4"),
    },
  ],
  images: [
    {
      layerName: "Photo_01",
      path: join(assetsDir, "cover01.png"),
      composition: "Instagram_Story",
    },
  ],
  audio: [
    {
      layerName: "Audio_01",
      path: join(assetsDir, "news.mp3"),
    },
  ],
  text: [
    {
      layerName: "Text_02",
      property: "Source Text",
      defaultValue: "NEURONEWS",
      composition: "Text_02",
    },
  ],
};
