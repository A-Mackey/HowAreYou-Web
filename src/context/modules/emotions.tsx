export function getImageFromEmotion(emotion: string) {
  switch (emotion) {
    case "good":
      return "./icons/GoodEmoji.svg";
    case "alright":
      return "./icons/AlrightEmoji.svg";
    case "bad":
      return "./icons/BadEmoji.svg";
    default:
      return "./icons/GoodEmoji.svg";
  }
}

export const emotions = [
  { name: "good", icon: "./icons/GoodEmoji.svg" },
  { name: "alright", icon: "./icons/AlrightEmoji.svg" },
  { name: "bad", icon: "./icons/BadEmoji.svg" },
];
