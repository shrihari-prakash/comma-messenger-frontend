import theme_black from "./themes/theme-black";
import theme_default from "./themes/theme-default";
import theme_light from "./themes/theme-light";

export const Themes = [
  { ...theme_default },
  { ...theme_light },
  { ...theme_black },
];

const Theme = (() => {
  let themePreference = localStorage.getItem("comma_theme_preference");
  if (!themePreference) themePreference = "default";
  let themeObject = Themes.find((t) => t.name === themePreference);
  if (!themeObject) themeObject = Themes.find((t) => t.name === "default");
  let themeVariables = themeObject.themeVariables;
  let root = document.documentElement;
  root.style.setProperty(
    "--app-background",
    themeVariables.COLORS.APP_BACKGROUND
  );
  return themeVariables;
})();

export default Theme;
