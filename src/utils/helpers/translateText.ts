import { openai } from '../../core/openai';

export async function translateText(
  text: string,
  targetLang: string,
  triggerWord: string
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Don't translate the trigger **word ${triggerWord}** and leave it in English. Always answer with letters, without using numbers. Translate the following text to ${targetLang}. Preserve the original meaning and tone as much as possible. ${
            targetLang === 'ru' &&
            'In Cyrillic all words. Правильно писать **на острове Пхукет**. Это связано с тем, что острова, в том числе Пхукет, в русском языке чаще всего употребляются с предлогом «на».'
          }`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
    });

    const translatedText = completion.choices[0].message.content;
    // console.log(translatedText, "translatedText");
    if (translatedText === null) {
      return Promise.reject(new Error('Received null content from OpenAI'));
    }

    return translatedText;
  } catch (error) {
    console.error('Error in translation:', error);
    return Promise.reject(error);
  }
}
