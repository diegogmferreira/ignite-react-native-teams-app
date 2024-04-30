import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupeName: string) {
  try {
    const storedGroups = await groupsGetAll();

    if(storedGroups.includes(newGroupeName)) {
      throw new AppError('Já existe um grupo cadastrado com esse nome');
    }

    const formatedStorage = JSON.stringify([...storedGroups, newGroupeName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, formatedStorage);

  } catch (error) {
    throw error;
  }
}