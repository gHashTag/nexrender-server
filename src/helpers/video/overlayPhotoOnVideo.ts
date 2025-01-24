import ffmpeg from "fluent-ffmpeg"

export async function overlayPhotoOnVideo(inputVideoPath: string, inputPhotoPath: string, outputVideoPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputVideoPath)
      .input(inputPhotoPath)
      .complexFilter([
        {
          filter: "overlay",
          options: {
            x: 0,
            y: 0,
            enable: `between(t,0,20)`,
          },
        },
      ])
      .outputOptions("-pix_fmt", "yuv420p")
      .outputOptions("-c:a", "copy")
      .save(outputVideoPath)
      .on("end", () => {
        resolve()
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}
