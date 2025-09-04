const sklonen = (number: number): string => {
  const titles = ['день', 'дня', 'дней'];
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const appendNull = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const inputDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffDays = Math.floor(
    (today.getTime() - inputDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays === 0
    ? `Сегодня, ${appendNull(date.getHours())}:${appendNull(date.getMinutes())}`
    : diffDays === 1
      ? `Вчера, ${appendNull(date.getHours())}:${appendNull(date.getMinutes())}`
      : `${diffDays} ${sklonen(diffDays)} назад, ${appendNull(date.getHours())}:${appendNull(date.getMinutes())}`;
};
