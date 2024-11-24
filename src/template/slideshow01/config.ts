import { join } from "path";
import { TemplateAssets, TemplateConfig } from "../../types/template.types";
import { CONFIG } from "../../config/constants";

const TEMPLATE_CONFIG = {
  name: "Multiscreen Slideshow 2023",
  composition: "Render",
  paths: {
    template: join(
      CONFIG.paths.base,
      "src",
      CONFIG.paths.templates,
      "slideshow01",
      "Project"
    ),
    assets: join(
      CONFIG.paths.base,
      "src",
      CONFIG.paths.templates,
      "slideshow01",
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
    TEMPLATE_CONFIG.paths.template,
    "Multiscreen Slideshow 2023.aep"
  ),
};

export const assets: TemplateAssets = {
  videos: [],
  images: [
    // SC01: media_01 to media_04
    ...[4, 3, 2, 1].map((i) => ({
      layerName: `media_${i.toString().padStart(2, "0")}`,
      path: join(
        TEMPLATE_CONFIG.paths.assets,
        `${i.toString().padStart(2, "0")}.jpg`
      ),
      composition: "SC01",
    })),
    // SC02: media_08 down to media_05
    ...[8, 7, 6, 5].map((i) => ({
      layerName: `media_${i.toString().padStart(2, "0")}`,
      path: join(
        TEMPLATE_CONFIG.paths.assets,
        `${i.toString().padStart(2, "0")}.jpg`
      ),
      composition: "SC02",
    })),
    // SC03: media_13 down to media_09
    ...[13, 12, 11, 10, 9].map((i) => ({
      layerName: `media_${i.toString().padStart(2, "0")}`,
      path: join(
        TEMPLATE_CONFIG.paths.assets,
        `${i.toString().padStart(2, "0")}.jpg`
      ),
      composition: "SC03",
    })),
    // SC04: media_17 down to media_14
    ...[17, 16, 15, 14].map((i) => ({
      layerName: `media_${i.toString().padStart(2, "0")}`,
      path: join(
        TEMPLATE_CONFIG.paths.assets,
        `${i.toString().padStart(2, "0")}.jpg`
      ),
      composition: "SC04",
    })),
    // SC05: media_21 down to media_18
    ...[21, 20, 19, 18].map((i) => ({
      layerName: `media_${i.toString().padStart(2, "0")}`,
      path: join(
        TEMPLATE_CONFIG.paths.assets,
        `${i.toString().padStart(2, "0")}.jpg`
      ),
      composition: "SC05",
    })),
    // SC06: media_25 down to media_22
    ...[25, 24, 23, 22].map((i) => ({
      layerName: `media_${i.toString().padStart(2, "0")}`,
      path: join(
        TEMPLATE_CONFIG.paths.assets,
        `${i.toString().padStart(2, "0")}.jpg`
      ),
      composition: "SC06",
    })),
  ],
  audio: [
    {
      composition: "Render",
      layerName: "Audio_01",
      path: join(TEMPLATE_CONFIG.paths.assets, "audio1.mp3"),
    },
  ],
  text: [
    {
      layerName: "Creative Split Screen Template",
      property: "Source Text",
      defaultValue: "KATA\nCondominium",
      composition: "text_01",
    },
    {
      layerName: "Brand Your Template",
      property: "Source Text",
      defaultValue: "Luxury Living",
      composition: "text_02",
    },
    {
      layerName: "New Skills In Design",
      property: "Source Text",
      defaultValue: "Ocean View",
      composition: "text_03",
    },
    {
      layerName: "Elevate Your Style",
      property: "Source Text",
      defaultValue: "5 Min to Beach",
      composition: "text_04",
    },
    {
      layerName: "Stylish",
      property: "Source Text",
      defaultValue: "Premium",
      composition: "text_05",
    },
    {
      layerName: "Reimagine Your Presentations Today",
      property: "Source Text",
      defaultValue: "Smart Home",
      composition: "text_06",
    },
    {
      layerName: "Instantly Captivate",
      property: "Source Text",
      defaultValue: "Modern Design",
      composition: "text_07",
    },
    {
      layerName: "Timeless And Impactful",
      property: "Source Text",
      defaultValue: "Elite Lifestyle",
      composition: "text_08",
    },
    {
      layerName: "Capture Attention",
      property: "Source Text",
      defaultValue: "Investment",
      composition: "text_09",
    },
    {
      layerName: "Unlock  Creative Possibilities",
      property: "Source Text",
      defaultValue: "Special Price",
      composition: "text_10",
    },
    {
      layerName: "Stay Ahead In Design",
      property: "Source Text",
      defaultValue: "Save & Share",
      composition: "text_11",
    },
    {
      layerName: "Ignite Your Project’s Potential",
      property: "Source Text",
      defaultValue: "Exclusive Offer",
      composition: "text_12",
    },
    {
      layerName: "Thanks For Watching",
      property: "Source Text",
      defaultValue: "Comment below KATA",
      composition: "text_13",
    },
  ],
};
