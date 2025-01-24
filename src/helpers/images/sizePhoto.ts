import sharp from "sharp"

export async function sizePhoto(photoPath: string, outputPath: string): Promise<string> {
  try {
    const photo = sharp(photoPath)
    await photo.resize(720, 1280).toFile(outputPath)
    return outputPath
  } catch (error) {
    console.error(`Ошибка в sizePhoto:`, error)
    throw error
  }
}
