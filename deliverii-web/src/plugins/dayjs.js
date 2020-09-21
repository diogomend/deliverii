import dayjs from "dayjs";

export const formatDate = date => {
  const dayJSDate = new dayjs(date);
  return dayJSDate.format("YYYY-MM-DD HH:mm");
};
