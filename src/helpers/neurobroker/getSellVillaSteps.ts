import { openai } from "../../core/openai"

export async function getSellVillaSteps({ prompt, location, type }: { prompt: string; location: string; type: string }) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that creates steps for selling a ${type} in a tourist area in location: ${location}. Create a creative sales description every time`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      response_format: { type: "json_object" },
    })
    console.log(completion, "completion")

    const content = completion.choices[0].message.content
    if (content === null) {
      throw new Error("Received null content from OpenAI")
    }

    console.log(content)
    return JSON.parse(content)
  } catch (error) {
    console.error("Error:", error)
    throw error // Перебрасываем ошибку, чтобы она могла быть обработа��а выше
  }
}
