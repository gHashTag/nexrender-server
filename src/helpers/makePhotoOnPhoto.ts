import sharp from "sharp"

export async function makePhotoOnPhoto(backgroundPath: string, overlayPath: string, outputPath: string): Promise<string> {
  try {
    const background = sharp(backgroundPath)
    const overlayBuffer = await sharp(overlayPath).toBuffer()

    const output = await background.composite([{ input: overlayBuffer, blend: "over" }])
    await output.png().toFile(outputPath)
    return outputPath
  } catch (error) {
    console.error(`Ошибка в makePhotoOnPhoto:`, error)
    throw error
  }
}
