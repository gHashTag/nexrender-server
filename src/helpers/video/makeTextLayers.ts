import path from "path"
import * as fs from "fs/promises"
import sharp from "sharp"
import { createYellowAndWhiteText } from "./"
import { escapeXml } from "../images/escapeXml"
import { createSVGWithWhiteText } from "./createSVGWithWhiteText"

export async function makeTextLayers(
  text: string,
  outputPath: string,
  _isTop: boolean,
  logoPath: string,
  reelsType?: string,
  logoTopPadding?: number,
): Promise<string> {
  try {
    const width = 720
    const height = 1280
    const layersPath = path.resolve(__dirname, "../assets/layers/")

    let svgBuffer: Buffer
    if (reelsType === "lifehack") {
      svgBuffer = await fs.readFile(`${layersPath}/lifehack.png`)
    } else if (reelsType === "sciencepop") {
      svgBuffer = await fs.readFile(`${layersPath}/sciencepop.png`)
    } else if (reelsType === "didyouknow") {
      svgBuffer = await fs.readFile(`${layersPath}/didyouknow.png`)
    } else if (reelsType === "math") {
      svgBuffer = await fs.readFile(`${layersPath}/math.png`)
    } else if (reelsType === "english") {
      svgBuffer = await fs.readFile(`${layersPath}/english.png`)
    } else if (reelsType === "cheatsheet") {
      svgBuffer = await fs.readFile(`${layersPath}/cheatsheet.png`)
    } else if (reelsType === "neuronews") {
      svgBuffer = await fs.readFile(`${layersPath}/neuronews.png`)
    } else if (reelsType && reelsType.includes("neurotop")) {
      const themeIndex = reelsType.split("_")[1]
      svgBuffer = await fs.readFile(`${layersPath}/neurotop${themeIndex}.png`)
    } else if (reelsType === "neurocoder") {
      const svgImage = createYellowAndWhiteText(width, 700, escapeXml(text))
      svgBuffer = Buffer.from(svgImage)
    } else {
      const svgImage = createSVGWithWhiteText(width, 600, escapeXml(text))
      svgBuffer = Buffer.from(svgImage)
    }
    const outputFilePath = outputPath.endsWith(".png") ? outputPath : `${outputPath}.png`

    // Загружаем логотип
    const logoBuffer = await fs.readFile(logoPath)

    // Загружаем изображение description
    const descriptionPath = path.resolve(__dirname, "./melimi/assets/logo/")
    const descriptionBuffer = await fs.readFile(`${descriptionPath}/description.png`)

    // Изменяем размер логотипа
    const resizedLogoBuffer = await sharp(logoBuffer)
      .resize({ width: Math.floor(width * 0.7), height: Math.floor(height * 0.3), fit: "inside" })
      .toBuffer()

    // Изменяем размер изображения description
    const resizedDescriptionBuffer = await sharp(descriptionBuffer)
      .resize({ width: Math.floor(width * 0.7), height: Math.floor(height * 0.1), fit: "inside" })
      .toBuffer()

    // Получаем размеры измененного логотипа
    const logoMetadata = await sharp(resizedLogoBuffer).metadata()
    const logoWidth = logoMetadata.width || Math.floor(height * 0.2)
    const logoHeight = logoMetadata.height || Math.floor(height * 0.2)

    // Получаем размеры измененного изображения description
    const descriptionMetadata = await sharp(resizedDescriptionBuffer).metadata()
    const descriptionWidth = descriptionMetadata.width || Math.floor(height * 0.3)

    // Вычисляем позицию логотипа (в верхнем центре)
    const logoLeft = Math.floor((width - logoWidth) / 2)
    const logoTop = logoTopPadding ? logoTopPadding : -20

    // Вычисляем позицию основного текста (под логотипом)
    const textTop = !reelsType ? logoTop + logoHeight + 290 : reelsType === "neurocoder" ? height / 2 - 200 : 0

    // Вычисляем позицию изображения description (под основным текстом)
    const descriptionLeft = Math.floor((width - descriptionWidth) / 2)
    const descriptionTop = 1030

    await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0.4 },
      },
    })
      .composite([
        {
          input: resizedLogoBuffer,
          top: logoTop,
          left: logoLeft,
        },
        {
          input: svgBuffer,
          top: textTop,
          left: 0,
        },
        ...(reelsType && reelsType !== "neurocoder" && reelsType !== "neuronews"
          ? [
              {
                input: resizedDescriptionBuffer,
                top: descriptionTop,
                left: descriptionLeft,
              },
            ]
          : []),
      ])
      .png()
      .toFile(outputFilePath)

    return outputFilePath
  } catch (error) {
    console.error(`Ошибка в makeTextLayers:`, error)
    throw error
  }
}
