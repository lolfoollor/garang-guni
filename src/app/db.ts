import { openDB } from "idb";
import msg from "@/locales/en/app/app.json";
import { interpolateMessage } from "@/utils/textUtils";

const IMAGE_DATABASE_NAME = "images";

export const initDB = async () => {
  return openDB("image-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(IMAGE_DATABASE_NAME)) {
        db.createObjectStore(IMAGE_DATABASE_NAME);
      }
    },
  });
};

export const saveImage = async (key: string, file: File) => {
  const db = await initDB();
  await db.put(IMAGE_DATABASE_NAME, file, key);
};

export const getImage = async (key: string): Promise<File | undefined> => {
  const db = await initDB();
  return db.get(IMAGE_DATABASE_NAME, key);
};

export const deleteImage = async (key: string) => {
  const db = await initDB();
  await db.delete(IMAGE_DATABASE_NAME, key);
};

export const loadImageBlob = async (key: string) => {
  const db = await initDB();
  const image = await db.get(IMAGE_DATABASE_NAME, key);
  if (!image) {
    throw new Error(
      interpolateMessage(msg.image.notFound, {
        key,
      }),
    );
  }

  return URL.createObjectURL(image);
};
