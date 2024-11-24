// src/lib/generateAssets.ts

import { translateText } from '../translateText';

type Asset = {
  readonly type: string;
  readonly composition: string;
  readonly layerName: string;
  readonly property: string;
  readonly value: string;
};

export type Step = {
  readonly step: string;
  readonly details: string;
  readonly voiceOver?: {
    readonly en: string;
    readonly ru: string;
    readonly zh: string;
  };
};

export type SellVillaSteps = {
  readonly activities: readonly {
    readonly steps: readonly Step[];
  }[];
};

export const generateAssets = async ({
  sellVillaSteps,
  triggerWord,
}: {
  readonly sellVillaSteps: SellVillaSteps;
  readonly triggerWord: string;
}): Promise<readonly Asset[]> => {
  console.log('Проверка структуры sellVillaSteps:', {
    hasActivities: Boolean(sellVillaSteps?.activities),
    firstActivity: sellVillaSteps?.activities?.[0],
    hasSteps: Boolean(sellVillaSteps?.activities?.[0]?.steps),
  });

  if (
    !sellVillaSteps?.activities?.[0]?.steps ||
    !Array.isArray(sellVillaSteps.activities[0].steps)
  ) {
    console.error('Некорректная структура данных: отсутствует массив steps');
    return [];
  }

  const steps = sellVillaSteps.activities[0].steps;

  console.log(
    'Activities[0]:',
    JSON.stringify(sellVillaSteps.activities[0], null, 2)
  );
  console.log('Steps before check:', steps);

  if (!Array.isArray(steps) || steps.length === 0) {
    console.error('steps не является массивом или пустой');
    return [];
  }

  console.log('Steps data:', JSON.stringify(steps, null, 2));

  const stepsData = await Promise.all(
    Array.from({ length: 25 }).map(async (_, index) => ({
      step: `Step ${index + 1}`,
      details: steps[index % steps.length].details || '',
      voiceOver: {
        en: `Write the word ${triggerWord} and get access directly to the developer.`,
        ru: await translateText(
          `Напишите комментарий слово ${triggerWord} и получите доступ напрямую к застройщику.`,
          'ru',
          triggerWord
        ),
        zh: await translateText(
          `寫下單字 ${triggerWord} 並獲得開發人員的存取權。`,
          'zh',
          triggerWord
        ),
        ar: await translateText(
          `اكتب الكلمة ${triggerWord} واحصل على وصول мباشر إلى المطور.`,
          'ar',
          triggerWord
        ),
      },
    }))
  );
  console.log(stepsData, 'stepsData');

  const assets: readonly Asset[] = stepsData.map((stepData, index) => ({
    type: 'data',
    composition: `Pl_${String(index + 1).padStart(2, '0')}`,
    layerName: `Step_${index + 1}`,
    property: 'Source Text',
    value: stepData.details,
  }));

  return assets;
};
