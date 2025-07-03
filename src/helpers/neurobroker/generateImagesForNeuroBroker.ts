import path from "path"
import { replicate } from "../../core/replicate"
import { downloadImage } from "../video/downloadImage"
import { Step } from "./generateImagesForMeditation"

export async function generateImagesForNeuroBroker(steps: Step[]) {
  const imagesWithText: { imagePath: string; text: string }[] = []
  console.log(imagesWithText, "imagesWithText")
  console.log("Начинаем генерацию изображений для медитации")
  console.log(steps, "steps")

  for (const step of steps) {
    try {
      // const model = "ghashtag/so_origin_kata:e82316f373dea8e2e97748d7dbfe269895a70e2891c18a2403a2080c942bb5b2"
      // const model = "ghashtag/artrio:46074c6d3a8074f6564be098ec32b4e1c9e03e661d9386b4e66a898fb535d702"
      const model = "ghashtag/modeva:c37189f6adde9084209e850c631d88a5d8de1e94f226e7c7ed2a9446f46897aa"
      console.log(model, "model")
      const input = {
        prompt: step.details.en,
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
        // const text = step.details[language];
        // console.log(text, "text");
        console.log(step, "step")
        try {
          // const processedImage = await addTextOnImage({ imagePath, text, step: step.step });

          // if (processedImage) {
          //   imagesWithText.push({ imagePath: processedImage.outputPath, text });
          //   console.log(`Изображение успешно обработано и сохранено для шага ${step.step}`);
          // }
          const outputFilePath = path.join(__dirname, `../images/output_step_${step.step}.png`)
          console.log(outputFilePath, "outputFilePath")
          const localImagePath = await downloadImage(imagePath, outputFilePath)

          // Добавляем локальный путь к изображению в массив
          imagesWithText.push({ imagePath: localImagePath, text: "" }) // Оставьте текст пустым или удалите его

          console.log(`Изображение успешно обработано и сохранено для шага ${step.step}`)
        } catch (error: any) {
          console.error(`Oшибка при обработке изображения для шага ${step.step}:`, error.message)
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
