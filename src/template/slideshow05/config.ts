import { join } from "path";
import { TemplateAssets, TemplateConfig } from "../../types/template.types";
import { CONFIG } from "../../config/constants";

const TEMPLATE_CONFIG = {
  name: "Futuristic Dynamic Opener",
  composition: "Render Comp",
  paths: {
    template: join(
      CONFIG.paths.base,
      "src",
      CONFIG.paths.templates,
      "slideshow05",
      "Futuristic Dynamic Opener",
      "Story"
    ),
    assets: join(
      CONFIG.paths.base,
      "src",
      CONFIG.paths.templates,
      "slideshow05",
      "Assets"
    ),
  },
};

export const config: TemplateConfig = {
  name: TEMPLATE_CONFIG.name,
  composition: TEMPLATE_CONFIG.composition,
  outputModule: "H.264 - Match Render Settings - 15 Mbps",
  outputExt: "mp4",
  settingsTemplate: "Best Settings",
  aepPath: join(
    CONFIG.paths.base,
    "src",
    CONFIG.paths.templates,
    "slideshow05",
    "Futuristic Dynamic Opener",
    "Story",
    "Futuristic Dynamic Opener.aep"
  ),
};

export const assets: TemplateAssets = {
  videos: [],
  images: Array.from({ length: 22 }, (_, i) => ({
    layerName: `${(i + 1).toString().padStart(2, "0")}.jpg`,
    path: join(
      TEMPLATE_CONFIG.paths.assets,
      `${(i + 1).toString().padStart(2, "0")}.jpg`
    ),
    composition: `Plch_${(i + 1).toString().padStart(2, "0")}`,
  })),
  audio: [
    {
      layerName: "Audio_01",
      path: join(TEMPLATE_CONFIG.paths.assets, "audio1.mp3"),
    },
    {
      layerName: "Elevenlabs",
      path: join(TEMPLATE_CONFIG.paths.assets, "elevenlabs.mp3"),
      composition: "Render Comp",
    },
  ],
  text: [
    {
      layerName: "we are best team",
      property: "Source Text",
      defaultValue: "Condominium KATA",
      composition: "Scene 1",
    },
    {
      layerName: "make an amazing",
      property: "Source Text",
      defaultValue: "Phuket, Thailand",
      composition: "Scene 1",
    },
    {
      layerName: "smileee!",
      property: "Source Text",
      defaultValue: "Tropical Paradise",
      composition: "Scene 2",
    },
    {
      layerName: "travel!",
      property: "Source Text",
      defaultValue: "Heart of Kata Beach",
      composition: "Scene 3",
    },
    {
      layerName: "be yourself",
      property: "Source Text",
      defaultValue: "Phuket's Elite Area",
      composition: "Scene 4",
    },
    {
      layerName: "think about yourself",
      property: "Source Text",
      defaultValue: "5 Minutes to Ocean",
      composition: "Scene 5",
    },
    {
      layerName: "futuristic",
      property: "Source Text",
      defaultValue: "Kata Beach",
      composition: "Scene 7",
    },
    {
      layerName: "and",
      property: "Source Text",
      defaultValue: "Perfect Balance",
      composition: "Scene 8",
    },
    {
      layerName: "cinematic",
      property: "Source Text",
      defaultValue: "Kata Beach",
      composition: "Scene 9",
    },
    {
      layerName: "view",
      property: "Source Text",
      defaultValue: "Modern Design",
      composition: "Scene 9",
    },
    {
      layerName: "colorful",
      property: "Source Text",
      defaultValue: "Exclusive Living",
      composition: "Scene 10",
    },
    {
      layerName: "make with us!",
      property: "Source Text",
      defaultValue: "Elite",
      composition: "Scene 11",
    },
    {
      layerName: "opener",
      property: "Source Text",
      defaultValue: "Invest Now",
      composition: "Scene 11",
    },
  ],
};
