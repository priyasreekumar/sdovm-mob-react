/**
 * @fileoverview Library file for async storage librabry.
 * @author Mohammed Shahabas
 */
import AsyncStorage from '@react-native-community/async-storage';

asyncStorageFunction = {
  storeData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  },

  retrieveData: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },

  removeData: async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  clearItems: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default asyncStorageFunction;
