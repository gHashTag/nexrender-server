/* eslint-disable functional/no-let */
// import { existsSync } from "fs";
// import { join } from "path";
import 'dotenv/config';
// import axios from "axios";

// import { createRenderJob } from "./services/renderService";
// import { config } from "./template/neuronews/config";
import { speech } from "./courses/speech";

// const templateName = "riddle";
console.log('API Key:', process.env.ELEVENLABS_API_KEY);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const main = async () => {
//   try {
//     console.log("\nПроверка сервера...");
//     let serverAvailable = false;

//     await Array.from({ length: 3 }).reduce(async (promise, _, index) => {
//       await promise;
//       if (serverAvailable) return;

//       try {
//         const healthCheck = await axios.get(
//           "http://localhost:3000/api/v1/jobs",
//           {
//             headers: {
//               "nexrender-secret": process.env.NEXRENDER_SECRET || "myapisecret",
//             },
//             timeout: 2000,
//           }
//         );
//         if (healthCheck.status === 200) {
//           serverAvailable = true;
//           console.log("Сервер доступен");
//         }
//       } catch (error) {
//         console.log(
//           `Попытка ${
//             index + 1
//           }: Сервер недоступен, повторная попытка через 2 секунды...`
//         );
//         await sleep(2000);
//       }
//     }, Promise.resolve());

//     if (!serverAvailable) {
//       console.error("Сервер недоступен после нескольких попыток");
//       return;
//     }

//     console.log("\nСоздание задания...");
//     const job = await createRenderJob(templateName);
//     console.log("Задание создано");

//     console.log("\nОтправка задания на сервер...");
//     const response = await axios.post(
//       "http://localhost:3000/api/v1/jobs",
//       job,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "nexrender-secret": process.env.NEXRENDER_SECRET || "myapisecret",
//         },
//       }
//     );

//     const jobId = response.data.uid;
//     console.log(`Задание принято, ID: ${jobId}`);

//     const checkProgress = async (jobId: string): Promise<void> => {
//       const statusResponse = await axios.get(
//         `http://localhost:3000/api/v1/jobs/${jobId}`,
//         {
//           headers: {
//             "nexrender-secret": process.env.NEXRENDER_SECRET || "myapisecret",
//           },
//         }
//       );

//       const { state, renderProgress, error, template } = statusResponse.data;
//       console.log(
//         `[${new Date().toLocaleTimeString()}] Статус: ${state}, Прогресс: ${
//           renderProgress || "0"
//         }%`
//       );
//       if (state === "started") {
//         console.log("Детали задания:", {
//           template: statusResponse.data.template,
//           assets: statusResponse.data.assets,
//           renderProgress: statusResponse.data.renderProgress,
//         });
//       }

//       if (state === "finished") {
//         console.log("\nРендеринг успешно завершен!", statusResponse.data);
//         const outputPath =
//           template?.output ||
//           join(process.cwd(), "output", `${config.name}.mp4`);
//         console.log("Результат доступен в:", outputPath);

//         if (existsSync(outputPath)) {
//           console.log("Файл успешно создан!");
//         } else {
//           console.warn("Внимание: Файл не найден по указанному пути");
//         }
//         return;
//       }

//       if (state === "error" || error) {
//         console.error("\nОшибка рендеринга:", error);
//         const aerenderLog = statusResponse.data.aerenderLog;
//         if (aerenderLog) {
//           console.error("Лог aerender:", aerenderLog);
//         }
//         return;
//       }

//       await sleep(5000);
//       return checkProgress(jobId);
//     };

//     await checkProgress(jobId);
//   } catch (error) {
//     console.error("\nОшибка:", error);
//     process.exit(1);
//   }
// };

const main = async () => {
  await speech();
};
main();
