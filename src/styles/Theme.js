import theme_black from "./themes/theme-black";
import theme_default from "./themes/theme-default";
import theme_phoenix from "./themes/theme-phoenix";
import theme_nature from "./themes/theme-nature";
import theme_slate from "./themes/theme-slate";
import theme_light from "./themes/theme-light";

export const Themes = [
  { ...theme_default },
  { ...theme_black },
  { ...theme_phoenix },
  { ...theme_nature },
  { ...theme_slate },
  { ...theme_light },
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
