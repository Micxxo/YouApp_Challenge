type ZodiacSign = {
  sign: string;
  dateRange: { start: string; end: string };
  horoscope: string;
};

export const getZodiacAndHoroscope = (
  date: string | Date
): {
  zodiac: string;
  horoscope: string;
} => {
  const zodiacSigns: ZodiacSign[] = [
    {
      sign: "Aries",
      dateRange: { start: "03-21", end: "04-19" },
      horoscope: "Ram",
    },
    {
      sign: "Taurus",
      dateRange: { start: "04-20", end: "05-20" },
      horoscope: "Bull",
    },
    {
      sign: "Gemini",
      dateRange: { start: "05-21", end: "06-20" },
      horoscope: "Twins",
    },
    {
      sign: "Cancer",
      dateRange: { start: "06-21", end: "07-22" },
      horoscope: "Crab",
    },
    {
      sign: "Leo",
      dateRange: { start: "07-23", end: "08-22" },
      horoscope: "Lion",
    },
    {
      sign: "Virgo",
      dateRange: { start: "08-23", end: "09-22" },
      horoscope: "Virgin",
    },
    {
      sign: "Libra",
      dateRange: { start: "09-23", end: "10-22" },
      horoscope: "Balance",
    },
    {
      sign: "Scorpio",
      dateRange: { start: "10-23", end: "11-21" },
      horoscope: "Scorpion",
    },
    {
      sign: "Sagittarius",
      dateRange: { start: "11-22", end: "12-21" },
      horoscope: "Archer",
    },
    {
      sign: "Capricorn",
      dateRange: { start: "12-22", end: "01-19" },
      horoscope: "Goat",
    },
    {
      sign: "Aquarius",
      dateRange: { start: "01-20", end: "02-18" },
      horoscope: "Water Bearer",
    },
    {
      sign: "Pisces",
      dateRange: { start: "02-19", end: "03-20" },
      horoscope: "Fish",
    },
  ];

  const formattedDate = new Date(date);

  const dateMonth = formattedDate.getMonth() + 1;
  const dateDay = formattedDate.getDate();

  const getDateString = (month: number, day: number): string =>
    `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  for (const zodiac of zodiacSigns) {
    const startDate = getDateString(
      parseInt(zodiac.dateRange.start.split("-")[0]),
      parseInt(zodiac.dateRange.start.split("-")[1])
    );
    const endDate = getDateString(
      parseInt(zodiac.dateRange.end.split("-")[0]),
      parseInt(zodiac.dateRange.end.split("-")[1])
    );
    const dateDateString = getDateString(dateMonth, dateDay);

    if (
      (dateDateString >= startDate && dateDateString <= endDate) ||
      (zodiac.dateRange.start.split("-")[0] === "12" &&
        dateDateString >= "12-22")
    ) {
      return { zodiac: zodiac.sign, horoscope: zodiac.horoscope };
    }
  }

  return { zodiac: "Unknown", horoscope: "No horoscope available." };
};
