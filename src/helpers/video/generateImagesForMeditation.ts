import { openai } from "../../core/openai"
import { addTextOnImage } from "../images/addTextOnImage"
import { Step } from "../images/generateImagesForMeditation"

export async function generateImagesForMeditation(steps: Step[]) {
  const imagesWithText: { imagePath: string; text: string }[] = []
  console.log(imagesWithText, "imagesWithText")

  for (const step of steps) {
    try {
      const prompt = `Boosts cellular energy, enhancing your meditation experience. photorealism, bohemian style, pink and blue pastel color, hyper-realistic`

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1792",
      })

      if (response.data[0].url) {
        const imagePath = response.data[0].url
        const text = `${step.details}`
        const processedImage = await addTextOnImage({ imagePath, text, step: step.step })
        if (processedImage) {
          imagesWithText.push({ imagePath: processedImage.outputPath, text })
        }
      }
    } catch (error) {
      console.error("Error generating image:", error)
      // Используем запасное изображение
      // const text = `${step.details}`;
      // const processedImage = await addTextOnImage({ imagePath: fallbackImagePath, text });
      // if (processedImage) {
      //     imagesWithText.push({ imagePath: processedImage.outputPath, text });
      // }
    }
  }
  return imagesWithText
}
