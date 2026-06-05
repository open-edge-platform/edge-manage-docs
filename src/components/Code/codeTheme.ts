import { ThemeInput } from "shiki";

export const openvinoTheme: ThemeInput = {
  name: "openvino-dark",
  type: "dark",
  colors: {
    "editor.background": "#06145f",
    "editor.foreground": "#FFFFFF",
  },
  tokenColors: [
    {
      scope: ["source.dockerfile"],
      settings: {
        foreground: "#FFE980",
      },
    },
    {
      scope: ["keyword", "storage"],
      settings: {
        foreground: "#8CB7FF",
      },
    },
    {
      scope: ["string"],
      settings: {
        foreground: "#FFE45C",
      },
    },
    {
      scope: ["constant.numeric"],
      settings: {
        foreground: "#92F28F",
      },
    },
    {
      scope: ["punctuation"],
      settings: {
        foreground: "#D3A7FF",
      },
    },
  ],
};
