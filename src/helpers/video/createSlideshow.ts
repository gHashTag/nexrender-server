import ffmpeg from "fluent-ffmpeg"

export async function createSlideshow(images: string[], audioPath: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = ffmpeg()

    images.forEach((image, index) => {
      console.log(`Adding image ${index + 1}: ${image}`)
      command.input(image).loop(1)
    })

    // Добавляем аудио файл
    command.input(audioPath)

    command
      .outputOptions("-map", `${images.length}:a`) // Мапим аудио из последнего входного файла
      .outputOptions("-c:a", "aac") // Кодируем аудио в AAC
      .outputOptions("-shortest") // Обрезаем видео до длины самого короткого входного потока
      .outputOptions("-r", "25")
      .output(outputPath)
      .on("start", (commandLine) => {
        console.log("FFmpeg process started:", commandLine)
      })
      .on("progress", (progress) => {
        console.log("Processing: " + JSON.stringify(progress) + progress.percent + "% done")
      })
      .on("end", () => {
        console.log("FFmpeg process completed")
        resolve(outputPath)
      })
      .on("error", (err) => {
        console.error("FFmpeg error:", err)
        reject(err)
      })
      .run()
  })
}
