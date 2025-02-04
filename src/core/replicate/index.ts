import Replicate from 'replicate';

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const modelPricing: Record<string, string> = {
  'black-forest-labs/flux-1.1-pro': '$0.040 / image',
  'black-forest-labs/flux-1.1-pro-ultra': '$0.060 / image',
  'black-forest-labs/flux-canny-dev': '$0.025 / image',
  'black-forest-labs/flux-canny-pro': '$0.050 / image',
  'black-forest-labs/flux-depth-dev': '$0.025 / image',
  'black-forest-labs/flux-depth-pro': '$0.050 / image',
  'black-forest-labs/flux-dev': '$0.025 / image',
  'black-forest-labs/flux-dev-lora': '$0.032 / image',
  'black-forest-labs/flux-fill-dev': '$0.040 / image',
  'black-forest-labs/flux-fill-pro': '$0.050 / image',
  'black-forest-labs/flux-pro': '$0.055 / image',
  'black-forest-labs/flux-redux-dev': '$0.025 / image',
  'black-forest-labs/flux-redux-schnell': '$0.003 / image',
  'black-forest-labs/flux-schnell': '$0.003 / image',
  'black-forest-labs/flux-schnell-lora': '$0.020 / image',
  'ideogram-ai/ideogram-v2': '$0.080 / image',
  'ideogram-ai/ideogram-v2-turbo': '$0.050 / image',
  'luma/photon': '$0.030 / image',
  'luma/photon-flash': '$0.010 / image',
  'recraft-ai/recraft-20b': '$0.022 / image',
  'recraft-ai/recraft-20b-svg': '$0.044 / image',
  'recraft-ai/recraft-v3': '$0.040 / image',
  'recraft-ai/recraft-v3-svg': '$0.080 / image',
  'stability-ai/stable-diffusion-3': '$0.035 / image',
  'stability-ai/stable-diffusion-3.5-large': '$0.065 / image',
  'stability-ai/stable-diffusion-3.5-large-turbo': '$0.040 / image',
  'stability-ai/stable-diffusion-3.5-medium': '$0.035 / image',
};

// interface ModelConfig {
//   key: string;
//   word: string;
//   description: {
//     ru: string;
//     en: string;
//   };
//   price: number;
// }

// export const models: Record<string, ModelConfig> = {
//   ['flux 1.1pro ultra']: {
//     key: 'black-forest-labs/flux-1.1-pro-ultra',
//     word: 'ultra realistic photograph, 8k uhd, high quality',
//     description: {
//       ru: '🎨 Flux - фотореалистичные изображения высокого качества',
//       en: '🎨 Flux - photorealistic high quality images',
//     },
//     price: 0.06,
//   },
//   sdxl: {
//     key: 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc',
//     word: 'ultra realistic photograph, 8k uhd, high quality',
//     description: {
//       ru: '🎨 SDXL - фотореалистичные изображения высокого качества',
//       en: '🎨 SDXL - photorealistic high quality images',
//     },
//     price: 0.04,
//   },
//   ['sd 3.5 turbo']: {
//     key: 'stability-ai/stable-diffusion-3.5-large-turbo',
//     word: '',
//     description: {
//       ru: '🎨 SD3 - фотореалистичные изображения высокого качества',
//       en: '🎨 SD3 - photorealistic high quality images',
//     },
//     price: 0.04,
//   },
//   ['recraft v3']: {
//     key: 'recraft-ai/recraft-v3',
//     word: '',
//     description: {
//       ru: '🎨 Recraft - фотореалистичные изображения высокого качества',
//       en: '🎨 Recraft - photorealistic high quality images',
//     },
//     price: 0.022,
//   },
//   photon: {
//     key: 'luma/photon',
//     word: '',
//     description: {
//       ru: '🎨 Photon - фотореалистичные изображения высокого качества',
//       en: '🎨 Photon - photorealistic high quality images',
//     },
//     price: 0.03,
//   },
//   lee_solar: {
//     key: 'ghashtag/lee_solar:7b7e9744c88e23c0eeccb9874c36336f73fce9d3d17992c8acabb04e67ee03b4',
//     word: '',
//     description: {
//       ru: '🎨 Lee Solar - астрологические изображения',
//       en: '🎨 Lee Solar - astrological images',
//     },
//     price: 0.022,
//   },
//   dpbelarusx: {
//     key: 'dpbelarusx/dpbelarusx:7b7e9744c88e23c0eeccb9874c36336f73fce9d3d17992c8acabb04e67ee03b4',
//     word: '',
//     description: {
//       ru: '🎨 DPBelarusX - астрологические изображения',
//       en: '🎨 DPBelarusX - astrological images',
//     },
//     price: 0.022,
//   },
//   neuro_coder: {
//     key: 'ghashtag/neuro_coder_flux-dev-lora:5ff9ea5918427540563f09940bf95d6efc16b8ce9600e82bb17c2b188384e355',
//     word: '',
//     description: {
//       ru: '🎨 NeuroCoder - астрологические изображения',
//       en: '🎨 NeuroCoder - astrological images',
//     },
//     price: 0.022,
//   },
// };
