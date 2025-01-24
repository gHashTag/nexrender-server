import { replicate } from "../../core/replicate"
import { downloadImage } from "../video/downloadImage"
import path from "path"
import { v4 as uuid } from "uuid"

export async function generateImageNeuroBroker(prompt: string) {
  const imagesWithText: { imagePath: string; text: string }[] = []
  console.log(imagesWithText, "imagesWithText")
  console.log("Начинаем генерацию изображений для медитации")

  try {
    const model = "ghashtag/neuro_broker:7abc7b18d0ef212b979eebeb46577d3192c6280c88d876c52ba5a2300f9283a0"

    console.log(model, "model")
    const input = {
      prompt,
      model: "dev",
      lora_scale: 1,
      num_outputs: 1,
      aspect_ratio: "9:16",
      output_format: "png",
      guidance_scale: 3.5,
      output_quality: 90,
      prompt_strength: 0.8,
      extra_lora_scale: 1,
      num_inference_steps: 28,
    }
    console.log(input, "input")

    let retries = 11
    let output

    while (retries > 0) {
      try {
        console.log(`Попытка генерации изображения (осталось попыток: ${retries})`)
        output = await replicate.run(model, { input })
        console.log(output, "✅ выход output")
        if (output && output[0]) {
          console.log(`Изображение успешно сгенерировано`)
          break
        }
      } catch (error: any) {
        console.error(`Ошибка при генерации изображения:`, error.message)
        retries--
        if (retries === 0) {
          throw error
        }
      }
    }

    if (output) {
      const imagePath = output
      console.log(imagePath, "imagePath")
      try {
        // const processedImage = await addTextOnImage({ imagePath, text, step: step.step });

        // if (processedImage) {
        //   imagesWithText.push({ imagePath: processedImage.outputPath, text });
        //   console.log(`Изображение успешно обработано и сохранено для шага ${step.step}`);
        // }
        const outputFilePath = path.join(__dirname, `../images/output_step_${uuid()}.png`)
        console.log(outputFilePath, "outputFilePath")
        const localImagePath = await downloadImage(imagePath, outputFilePath)

        // Добавляем локальный путь к изображению в массив
        imagesWithText.push({ imagePath: localImagePath, text: "" }) // Оставьте текст пустым или удалите его

        console.log(`Изображение успешно обработано`)
      } catch (error: any) {
        console.error(`шибка при обработке изображения:`, error.message)
        throw error // Перебрасываем ошибку, чтобы использовать запасное изображение
      }
    } else {
      throw new Error(`Не удалось сгенерировать изображения}`)
    }
  } catch (error: any) {
    console.error(`Ошибка при работе:`, error.message)
    throw error
  }

  console.log(`Генерация изображений завершена`)
  return imagesWithText
}
