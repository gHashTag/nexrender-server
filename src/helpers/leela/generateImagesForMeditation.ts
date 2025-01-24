import { replicate } from "../../core/replicate"

export interface Step {
  step: string
  details: {
    en: string
    es: string
  }
  voiceOver?: {
    en: string
    ru: string
    zh: string
  }
}

export async function generateImagesForMeditation(steps: Step[], language: "en" | "es") {
  const imagesWithText: { imagePath: string; text: string }[] = []
  console.log("Начинаем генерацию изображений для медитации")
  console.log(steps, "steps")

  for (const step of steps) {
    try {
      const prompt = `Boosts cellular energy, enhancing your meditation experience. photorealism, bohemian style, pink and blue pastel color, hyper-realistic`

      const isModelFlux = false
      const model = isModelFlux
        ? "black-forest-labs/flux-pro"
        : "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf"
      const input = {
        prompt,
        negative_prompt: "nsfw, erotic, violence, people, animals",
        guidance_scale: 7.5,
        num_inference_steps: 50,
        aspect_ratio: "9:16",
      }

      let retries = 11
      let output

      while (retries > 0) {
        try {
          console.log(`Попытка генерации изображения для шага ${step.step} (осталось попыток: ${retries})`)
          output = await replicate.run(model, { input })
          console.log(output, "✅ выход output")
          if (output && output[0]) {
            console.log(`Изображение успешно сгенерировано для шага ${step.step}`)
            break
          }
        } catch (error: any) {
          console.error(`Ошибка при генерации изображения для шага ${step.step}:`, error.message)
          retries--
          if (retries === 0) {
            throw error
          }
        }
      }

      if (output) {
        const imagePath = output
        console.log(imagePath, "imagePath")
        const text = step.details[language]
        console.log(text, "text")
        console.log(step, "step")
        try {
          const processedImage = await addTextOnImage({ imagePath, text, step: step.step })

          if (processedImage) {
            imagesWithText.push({ imagePath: processedImage.outputPath, text })
            console.log(`Изображение успешно обработано и сохранено для шага ${step.step}`)
          }
        } catch (error: any) {
          console.error(`шибка при обработке изображения для шага ${step.step}:`, error.message)
          throw error // Перебрасываем ошибку, чтобы использовать запасное изображение
        }
      } else {
        throw new Error(`Не удалось сгенерировать изображение для шага ${step.step}`)
      }
    } catch (error: any) {
      console.error(`Ошибка при работе с шагом ${step.step}:`, error.message)
      // Используем запасное изображение только если не удалось сгенерировать или обработать изображение
      // const fallbackImagePath = path.join(process.cwd(), "src/assets/fallback-image.jpg");
      // const text = `${step.details}`;
      // try {
      //   const processedImage = await addTextOnImage({ imagePath: fallbackImagePath, text, step: step.step });
      //   if (processedImage) {
      //     imagesWithText.push({ imagePath: processedImage.outputPath, text });
      //     console.log(`Использовано запасное изображение для шага ${step.step}`);
      //   }
      // } catch (fallbackError: any) {
      //   console.error(`Ошибка при использовании запасного изображения для шага ${step.step}:`, fallbackError.message);
      // }
    }
  }

  console.log(`Генерация изображений завершена. Всего изображений: ${imagesWithText.length}`)
  return imagesWithText
}
