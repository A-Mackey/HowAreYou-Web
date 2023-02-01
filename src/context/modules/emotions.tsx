export function getImageFromEmotion(emotion: string) {
  return `./icons/Emojis/${emotion}Emoji.svg`;
}

export function getRandomEmotion() {
  return emotions[Math.floor(Math.random() * emotions.length)];
}

export function getRandomGoodEmotion() {
  return goodEmotions[Math.floor(Math.random() * goodEmotions.length)];
}

export const emotions = [
  { name: "good", icon: "./icons/Emojis/goodEmoji.svg" },
  { name: "alright", icon: "./icons/Emojis/alrightEmoji.svg" },
  { name: "bad", icon: "./icons/Emojis/badEmoji.svg" },

  { name: "angry", icon: "./icons/Emojis/angryEmoji.svg" },
  { name: "annoyed", icon: "./icons/Emojis/annoyedEmoji.svg" },
  { name: "cool", icon: "./icons/Emojis/coolEmoji.svg" },
  { name: "goofy", icon: "./icons/Emojis/goofyEmoji.svg" },
  { name: "injured", icon: "./icons/Emojis/injuredEmoji.svg" },
  { name: "inlove", icon: "./icons/Emojis/inloveEmoji.svg" },
  { name: "laughing", icon: "./icons/Emojis/laughingEmoji.svg" },
  { name: "lovey", icon: "./icons/Emojis/loveyEmoji.svg" },
  { name: "peaceful", icon: "./icons/Emojis/peacefulEmoji.svg" },
  { name: "rich", icon: "./icons/Emojis/richEmoji.svg" },
  { name: "sick", icon: "./icons/Emojis/sickEmoji.svg" },
  { name: "star", icon: "./icons/Emojis/starEmoji.svg" },
  { name: "tired", icon: "./icons/Emojis/tiredEmoji.svg" },
  { name: "worried", icon: "./icons/Emojis/worriedEmoji.svg" },
];

export const goodEmotions = [
  { name: "cool", icon: "./icons/Emojis/coolEmoji.svg" },
  { name: "goofy", icon: "./icons/Emojis/goofyEmoji.svg" },
  { name: "good", icon: "./icons/Emojis/goodEmoji.svg" },
  { name: "inlove", icon: "./icons/Emojis/inloveEmoji.svg" },
  { name: "laughing", icon: "./icons/Emojis/laughingEmoji.svg" },
  { name: "lovey", icon: "./icons/Emojis/loveyEmoji.svg" },
  { name: "peaceful", icon: "./icons/Emojis/peacefulEmoji.svg" },
  { name: "rich", icon: "./icons/Emojis/richEmoji.svg" },
  { name: "star", icon: "./icons/Emojis/starEmoji.svg" },
];
