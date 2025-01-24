import axios from "axios"
import sharp from "sharp"
import path from "path"
import { createSVGWithHighlightedText } from "./createSVGWithHighlightedText"

export async function addTextOnImage({ imagePath, text, step }: { imagePath: string; text: string; step: string }) {
  try {
    let buffer: Buffer

    try {
      console.log(`Попытка загрузки изображения для шага ${step}: ${imagePath}`)
      const response = await axios.get(imagePath, {
        responseType: "arraybuffer",
        timeout: 15000, // Увеличим таймаут до 15 секунд
      })
      buffer = Buffer.from(response.data, "binary")
      console.log(`Изображение успешно загружено для шага ${step}`)
    } catch (downloadError: any) {
      console.error(`Ошибка загрузки и��ображения для шага ${step}:`, downloadError.message)
      if (downloadError.response) {
        console.error(`Статус ответа: ${downloadError.response.status}`)
        console.error(`Заголовки ответа:`, downloadError.response.headers)
      }
      throw downloadError
    }

    const width = 1024
    const height = 1792

    const svgImage = createSVGWithHighlightedText(width, height, text)
    const svgBuffer = Buffer.from(svgImage)

    const outputFileName = `src/images/slide-${step}.png`
    const outputPath = path.join(process.cwd(), outputFileName)

    const image = await sharp(buffer)
      .resize(width, height, { fit: "cover", position: "center" })
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(outputPath)
    return { image, outputPath }
  } catch (error: any) {
    console.error(`Ошибка в addTextOnImage для шага ${step}:`, error.message)
    throw error
  }
}
