import { DarkColors, LightColors } from "../utils/Colors";
import { useAppSelector } from "./useAppselector.tsx";

const useAppTheme = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? DarkColors : LightColors;

  return { theme, isDark };
};

export default useAppTheme;
