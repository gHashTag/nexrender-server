import fs from "fs";
import path from "path";

export const cleanupFiles = async (): Promise<void> => {
  const directories = [
    path.join(__dirname, "../../videos"),
    path.join(__dirname, "../../audio/ledov"),
  ];

  await Promise.all(
    directories.map(async (directory) => {
      if (fs.existsSync(directory)) {
        const files = fs.readdirSync(directory);

        await Promise.all(
          files.map(async (file) => {
            const filePath = path.join(directory, file);
            const stat = fs.lstatSync(filePath);

            if (stat.isDirectory()) {
              await fs.promises.rm(filePath, { recursive: true, force: true });
            } else {
              await fs.promises.unlink(filePath);
            }
          })
        );
      }
    })
  );
};
