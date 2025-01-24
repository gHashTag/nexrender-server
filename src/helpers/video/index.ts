import ffmpeg from "fluent-ffmpeg"
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

export * from "./generateImagesForMeditation"
export * from "./createSlideshow"
export * from "./createSVGWithWhiteText"
export * from "./makeTextLayers"
export * from "./createYellowAndWhiteText"
export * from "./toShortVideo"
export * from "./overlayPhotoOnVideo"

export { ffmpeg }
