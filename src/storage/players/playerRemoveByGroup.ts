import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayersGetByGroup } from "./playersGetByGroup";

export async function PlayerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await PlayersGetByGroup(group);
    const filteredPlayers = storage.filter(player => player.name !== playerName);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filteredPlayers));

  } catch (error) {
    throw error;
  }
}