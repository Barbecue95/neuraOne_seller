
export const isMorning = (date: Date = new Date()): boolean => {
  const hour = date.getHours();
  return hour >= 5 && hour < 12;
};

export const isAfternoon = (date: Date = new Date()): boolean => {
  const hour = date.getHours();
  return hour >= 12 && hour < 17;
};

export const isEvening = (date: Date = new Date()): boolean => {
  const hour = date.getHours();
  return hour >= 17 || hour < 5;
};
