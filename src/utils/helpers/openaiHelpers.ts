import { openai } from '../../core/openai';

type GetSellVillaStepsProps = {
  readonly prompt: string;
  readonly location: string;
  readonly type: string;
};

export async function getSellVillaSteps({
  prompt,
  location,
  type,
}: GetSellVillaStepsProps) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that creates steps for selling a ${type} in a tourist area in location: ${location}. Create a creative sales description every time`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (content === null) {
      console.error('Received null content from OpenAI');
      return;
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error:', error);
    return Promise.reject(error);
  }
}
