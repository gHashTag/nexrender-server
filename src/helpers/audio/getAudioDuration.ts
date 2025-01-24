import ffmpeg from "fluent-ffmpeg"

export async function getAudioDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
      } else {
        const duration = metadata.format.duration || 0
        resolve(duration)
      }
    })
  })
}
