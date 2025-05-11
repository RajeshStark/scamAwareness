import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import rootReducer from "../rootReducer.ts";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
  // whitelist: ["signup", "login", "theme", "viewConfig"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
