import { join } from "path";
import { TemplateAssets, TemplateConfig } from "../../types/template.types";

const baseDir = process.cwd();
const assetsDir = join(
  baseDir,
  "src",
  "template",
  "slideshow05",
  "Futuristic Dynamic Opener",
  "Story",
  "(Footage)"
);

export const config: TemplateConfig = {
  name: "Futuristic Dynamic Opener",
  composition: "Render Comp",
  outputModule: "H.264 - Match Render Settings - 15 Mbps",
  outputExt: "mp4",
  settingsTemplate: "Best Settings",
};

export const assets: TemplateAssets = {
  videos: [
    // Добавьте видео из папки (Footage)
    {
      layerName: "Video_01",
      path: join(assetsDir, "video1.mp4"),
      composition: "Render Comp",
    },
  ],
  images: [
    // Добавьте изображения из папки (Footage)
    {
      layerName: "Image_01",
      path: join(assetsDir, "image1.jpg"),
      composition: "Render Comp",
    },
  ],
  audio: [
    // Добавьте аудио из папки (Footage)
    {
      layerName: "Audio_01",
      path: join(assetsDir, "audio.mp3"),
    },
  ],
  text: [
    // Добавьте текстовые слои
    {
      layerName: "Title",
      property: "Source Text",
      defaultValue: "Your Title",
      composition: "Render Comp",
    },
  ],
};
