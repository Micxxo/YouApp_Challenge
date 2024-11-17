type IconMapping = {
  zodiac: string;
  horoscope: string;
};

export const getHoroscopeIconHelper = (horoscope: string) => {
  switch (horoscope) {
    case "aries":
      return "icon-park-outline:aries";
    case "aquarius":
      return "icon-park-outline:aquarius";
    case "taurus":
      return "icon-park-outline:taurus";
    case "gemini":
      return "tabler:zodiac-gemini";
    case "cancer":
      return "icon-park-outline:cancer";
    case "leo":
      return "icon-park-outline:leo";
    case "virgo":
      return "icon-park-outline:virgo";
    case "libra":
      return "icon-park-outline:libra";
    case "scorpius":
      return "icon-park-outline:scorpio";
    case "sagittarius":
      return "icon-park-outline:sagittarius";
    case "capricorn":
      return "tabler:zodiac-capricorn";
    case "pisces":
      "icon-park-outline:pisces";
    default:
      return "";
  }
};

export const getZodiacIconHelper = (zodiac: string) => {
  switch (zodiac) {
    case "rabbit":
      return "lucide:rabbit";
    case "dragon":
      return "fluent-emoji-high-contrast:dragon-face";
    default:
      "";
      break;
  }
};
