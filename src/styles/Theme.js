const Themes = [
  {
    id: 1,
    name: "default",
    displayName: "Default",
    themeVariables: {
      COLORS: {
        ACCENT: "#26538D",
        SECONDARY: "#9CAFBF",
        SURFACE: "#191919",
        SURFACE_LIGHTER: "#282828",
        BACKGROUND: "#121212",
        APP_BACKGROUND: "#121212",
        ON_ACCENT: "#FFFFFF",
        ON_SURFACE: "#FFFFFF",
        ON_BACKGROUND: "#FFFFFF",
      },
      BUTTON: {
        BORDER_RADIUS: "25px",
      },
      CONTAINER: {
        BORDER_RADIUS: "12px",
      },
      LIST: {
        BORDER_RADIUS: "15px",
      },
    },
  },
  {
    id: 1,
    name: "light",
    displayName: "Light",
    themeVariables: {
      COLORS: {
        ACCENT: "#0099cc",
        SECONDARY: "#9CAFBF",
        SURFACE: "#f2f2f2",
        SURFACE_LIGHTER: "#e6e6e6",
        BACKGROUND: "#f2f2f2",
        APP_BACKGROUND: "#e6e6e6",
        ON_ACCENT: "#FFFFFF",
        ON_SURFACE: "#121212",
        ON_BACKGROUND: "#121212",
      },
      BUTTON: {
        BORDER_RADIUS: "25px",
      },
      CONTAINER: {
        BORDER_RADIUS: "12px",
      },
      LIST: {
        BORDER_RADIUS: "15px",
      },
    },
  },
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
