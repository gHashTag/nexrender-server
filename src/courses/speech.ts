import fs from "fs";
import path from "path";
import { createAudioFileFromText } from "../core/elevenlabs/createAudioFileFromText";
import { Speech, SpeechTexts } from "./speech-neuroquest";

// Создаем аудиофайлы для каждого текста
const audioDir = path.join(__dirname, "ai-init");
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir);
}

export const speech = async () => {
  const languages = ["ru", "en"];
  const voiceIds = {
    ru: "ljyyJh982fsUinaSQPvv",
    en: "ljyyJh982fsUinaSQPvv",
  };

  for (const lang of languages) {
    const audioDir = path.join(__dirname, `ai-init-${lang}`);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir);
    }

    for (const [key, texts] of Object.entries(Speech)) {
      const text = texts[lang as keyof SpeechTexts]; // Указываем тип ключа
      const outputPath = path.join(audioDir, `audio_${key}.mp3`);
      const audioPath = await createAudioFileFromText({
        text: text,
        voice_id: voiceIds[lang as keyof typeof voiceIds],
      });

      // Перемещаем файл в нужную директорию
      fs.renameSync(audioPath, outputPath);
    }

    // Создаем текстовый файл с путями к аудиофайлам
    const fileListPath = path.join(audioDir, "audio_files.txt");
    const audioFiles = fs
      .readdirSync(audioDir)
      .filter((file) => file.endsWith(".mp3"));

    fs.writeFileSync(fileListPath, audioFiles.join("\n"), "utf8");
  }
};

// export const speech = async () => {
//   for (const [key, text] of Object.entries(Speech())) {
//     const outputPath = path.join(audioDir, `audio_${key}.mp3`);
//     const audioPath = await createAudioFileFromText({
//       text: text,
//       voice_id: "gPxfjvn7IXljXm1Tlb8o",
//     });
//     // zDCMSA3XQ9j63128ZvaU - Zavarikin
//     // gPxfjvn7IXljXm1Tlb8o - Vasilev

//     // Перемещаем файл в нужную директорию
//     fs.renameSync(audioPath, outputPath);
//   }

//   // Создаем текстовый файл с путями к аудиофайлам
//   const fileListPath = path.join(audioDir, "audio_files.txt");
//   const audioFiles = fs
//     .readdirSync(audioDir)
//     .filter((file) => file.endsWith(".mp3"));

//   fs.writeFileSync(fileListPath, audioFiles.join("\n"), "utf8");
// };
