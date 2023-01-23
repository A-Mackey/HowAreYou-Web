export function getImageFromEmotion(emotion: string) {
  return `./icons/Emojis/${emotion}Emoji.svg`;
}

export const emotions = [
  { name: "good", icon: "./icons/Emojis/goodEmoji.svg" },
  { name: "alright", icon: "./icons/Emojis/alrightEmoji.svg" },
  { name: "bad", icon: "./icons/Emojis/badEmoji.svg" },

  { name: "angry", icon: "./icons/Emojis/angryEmoji.svg" },
  { name: "injured", icon: "./icons/Emojis/injuredEmoji.svg" },
  { name: "peaceful", icon: "./icons/Emojis/peacefulEmoji.svg" },
  { name: "sick", icon: "./icons/Emojis/sickEmoji.svg" },
  { name: "tired", icon: "./icons/Emojis/tiredEmoji.svg" },
  { name: "worried", icon: "./icons/Emojis/worriedEmoji.svg" },
];
