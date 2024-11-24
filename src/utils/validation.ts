import { z } from 'zod';

export const JobSchema = z.object({
  template: z.object({
    src: z.string(),
    composition: z.string(),
    outputModule: z.string(),
    outputExt: z.string(),
    settingsTemplate: z.string(),
  }),
  assets: z.array(
    z.object({
      type: z.string(),
      src: z.string().optional(),
      layerName: z.string().optional(),
      composition: z.string().optional(),
      property: z.string().optional(),
      value: z.string().optional(),
    })
  ),
});
