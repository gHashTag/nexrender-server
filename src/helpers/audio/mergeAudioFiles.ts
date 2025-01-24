import ffmpeg from "fluent-ffmpeg"
import path from "path"

export async function mergeAudioFiles(audioStream1: string, audioStream2: string, outputFile: string): Promise<void> {
  const tempFile1 = path.join(__dirname, audioStream1)
  console.log(tempFile1, "tempFile1")
  const tempFile2 = path.join(__dirname, audioStream2)
  console.log(tempFile2, "tempFile2")
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(tempFile1)
      .input(tempFile2)
      .complexFilter([
        "[0:a]volume=0.2[a1]",
        "[1:a]volume=1.0[a2]",
        {
          filter: "amix",
          options: {
            inputs: 2,
            duration: "shortest",
            dropout_transition: 0,
          },
          inputs: ["a1", "a2"],
        },
      ])
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .save(outputFile)
  })
}
