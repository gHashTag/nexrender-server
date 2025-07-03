import { Step } from "../utils/helpers/neurobroker/generateAssets";
import { generateImagesForNeuroBroker } from "../utils/helpers/neurobroker/generateImagesForNeuroBroker";
import { promptNeuroBroker } from "../utils/helpers/neurobroker/mock";
import { getSellVillaSteps } from "../utils/helpers/openaiHelpers";
import { translateText } from "../utils/helpers/translateText";

type ContentParams = {
  readonly type: string;
  readonly location: string;
  readonly triggerWord: string;
};

type VoiceOvers = {
  readonly en: string;
  readonly ru: string;
  readonly zh: string;
  readonly ar: string;
};

const generateVoiceOvers = async (
  description: string,
  triggerWord: string
): Promise<VoiceOvers> => ({
  en: `${description} Write the word ${triggerWord} and get access directly to the developer.`,
  ru: await translateText(
    `${description} Напишите комментарий слово ${triggerWord} и получите доступ напрямую к застройщику.`,
    "ru",
    triggerWord
  ),
  zh: await translateText(
    `${description} 寫下單字 ${triggerWord} 並獲得開發人員的存取權。`,
    "zh",
    triggerWord
  ),
  ar: await translateText(
    `${description} اكتب الكلمة ${triggerWord} واحصل على وصول مباشر إلى المطور.`,
    "ar",
    triggerWord
  ),
});

export const generateContent = async ({
  type,
  location,
  triggerWord,
}: ContentParams) => {
  const sellVillaSteps = await getSellVillaSteps({
    prompt: promptNeuroBroker,
    location,
    type,
  });

  const stepsData: Step[] = await Promise.all(
    sellVillaSteps.activities[0].steps.map(
      async (step: Step, index: number) => ({
        step: `Step ${index + 1}`,
        details: { en: step.details },
        voiceOver: await generateVoiceOvers(
          sellVillaSteps.activities[0].description,
          triggerWord
        ),
      })
    )
  );

  const images = await generateImagesForNeuroBroker(stepsData);

  return { stepsData, images };
};
