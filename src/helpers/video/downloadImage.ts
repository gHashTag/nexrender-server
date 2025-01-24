import axios from "axios"
import * as fs from "fs/promises"

export async function downloadImage(url: string, outputPath: string): Promise<string> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" })
    await fs.writeFile(outputPath, response.data)
    console.log("Image downloaded successfully:", outputPath)
    return outputPath // Возвращаем путь к загруженному изображению
  } catch (error) {
    console.error("Error downloading image:", error)
    throw error // Перебрасываем ошибку, чтобы обработать её выше
  }
}
