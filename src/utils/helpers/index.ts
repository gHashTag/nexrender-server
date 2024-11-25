/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable functional/no-throw-statement */
import { existsSync } from "fs";
import fs from "fs";
import { resolve } from "path";

// eslint-disable-next-line import/order
import ffmpeg from "fluent-ffmpeg";
import { supabase } from "../../services/supabase";

const Creatomate = require("creatomate");

if (!process.env.CREATOMATE_API_KEY) {
  throw new Error("CREATOMATE_API_KEY не установлен");
}

const client = new Creatomate.Client(process.env.CREATOMATE_API_KEY);

// Функция для проверки существования файла
export const checkFile = (filePath: string): boolean => {
  return existsSync(filePath);
};

// Функция для создания корректного file:// URL
export const createFileUrl = (filePath: string): string => {
  const absolutePath = resolve(filePath);
  checkFile(absolutePath);
  return `file://${absolutePath}`;
};

// Функция для обрезки видео
export const trimVideo = async (
  sourceVideoPath: string,
  targetVideoPath: string,
  outputVideoPath: string,
  duration: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(sourceVideoPath, (err) => {
      if (err) {
        console.error("Ошибка при получении длительности видео:", err);
        reject(err);
        return;
      }

      ffmpeg(targetVideoPath)
        .setStartTime(0)
        .setDuration(duration)
        .output(outputVideoPath)
        .on("end", () => {
          console.log("Видео успешно обрезано");
          resolve();
        })
        .on("error", (err) => {
          console.error("Ошибка при обрезке видео:", err);
          reject(err);
        })
        .run();
    });
  });
};

// Функция для получения длительности видео
export const getVideoDuration = async (videoPath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        console.error("Ошибка при получении длительности видео:", err);
        reject(err);
        return;
      }

      const duration = metadata?.format?.duration;
      if (!duration) {
        reject(new Error("Не удалось получить длительность видео"));
        return;
      }

      console.log("Длительность исходного видео:", duration);
      resolve(duration);
    });
  });
};

export async function uploadVideo(
  filePath: string,
  bucket: string,
  fileName: string
) {
  try {
    const file = fs.readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (error) {
      console.error("Ошибка при загрузке видео:", error.message);
      throw error;
    }

    // Получаем публичный URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    console.log("Видео успешно загружено:", {
      ...data,
      publicUrl,
    });

    return {
      ...data,
      publicUrl,
    };
  } catch (error) {
    console.error("Ошибка при загрузке видео:", error);
    throw error;
  }
}

export const createRender = async ({
  template_id,
  modifications,
}: {
  readonly template_id: string;
  readonly modifications: Record<string, string>;
}) => {
  try {
    const options = {
      templateId: template_id,
      modifications: modifications,
    };

    const renders = await client.render(options, {
      debug: true,
    });
    console.log("Completed:", renders);

    return renders;
  } catch (error) {
    console.error("Ошибка создания рендера:", error);
    throw error;
  }
};
