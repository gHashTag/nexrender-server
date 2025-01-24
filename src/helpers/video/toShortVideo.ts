import ffmpeg from "fluent-ffmpeg"

export async function toShortVideo(videoPath: string, outputPath: string, width = 720, height = 1280): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .videoFilters(`crop=${width}:${height}`)
      .noAudio() // Удаляем аудио кодек с видео
      .duration(3)
      .output(outputPath)
      .on("start", (commandLine) => {
        console.log("FFmpeg process started:", commandLine)
      })
      .on("progress", (progress) => {
        console.log("Processing: " + Math.round(progress.percent || 0) + "% done")
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
