import { Location, Region } from "@/features/locations/components/Location";

export interface LocationJson {
  name: string;
  region: string;
  address: string;
  latLng: { lat: number; lng: number };
  days: string[];
  times: string[];
  imgDetail: { src: string; alt: string };
}

export interface OpeningSchedule {
  days: string[];
  times: string[];
}

export type OpeningStatus =
  | { isOpen: true; closesAt: Date }
  | { isOpen: false; nextOpensAt: Date | null };

const stringToRegion = (regionStr: string): Region => {
  switch (regionStr.toLowerCase()) {
    case "north":
      return Region.North;
    case "east":
      return Region.East;
    case "north east":
      return Region.NorthEast;
    case "central":
      return Region.Central;
    case "west":
      return Region.West;
    default:
      throw new Error(`Unknown region: ${regionStr}`);
  }
};

export const convertJsonToLocation = (
  locationsInJson: LocationJson[],
): Location[] => {
  return locationsInJson.map((location: LocationJson) => ({
    ...location,
    region: stringToRegion(location.region),
  }));
};

const parse12HourTimeAsDate = (
  strTimeIn12HoursClock: string,
  baseDate: Date = new Date(),
) => {
  if (!strTimeIn12HoursClock) return;

  const match = strTimeIn12HoursClock.match(/(\d+):(\d+) (\w+)/);
  if (!match) return;
  const [hours, min, period] = match.slice(1);
  const hoursIn24HoursClock =
    (parseInt(hours) % 12) + (period.toUpperCase() === "PM" ? 12 : 0);

  const date = new Date(baseDate);
  date.setHours(hoursIn24HoursClock, parseInt(min));

  return date;
};

const getCurrentTimeRangeStatus = (
  currDate: Date,
  periodInStr: string,
): { isOpen: boolean; closesAt: Date | null } => {
  const [openTimeStr, closeTimeStr] = periodInStr.split(" - ");
  const openDate = parse12HourTimeAsDate(openTimeStr);
  const closeDate = parse12HourTimeAsDate(closeTimeStr);

  // Invalidate it if it's not parsable
  if (!openDate || !closeDate) {
    return { isOpen: false, closesAt: null };
  }

  const isOpen = currDate >= openDate && currDate <= closeDate;

  return { isOpen, closesAt: isOpen ? closeDate : null };
};

const findNextOpening = (
  currDateAndTime: Date,
  schedule: OpeningSchedule,
  daysOfWeek: string[],
): Date | null => {
  for (let offset = 0; offset < 7; offset++) {
    const dayIdx = (currDateAndTime.getDay() + offset) % 7;
    const dayName = daysOfWeek[dayIdx];
    const isOpenAtThisDate = schedule.days.includes(dayName);
    if (isOpenAtThisDate) {
      for (const time of schedule.times) {
        const [openTimeStr] = time.split(" - ");
        const baseDate = new Date(currDateAndTime);
        baseDate.setDate(currDateAndTime.getDate() + offset);
        const openDate = parse12HourTimeAsDate(openTimeStr, baseDate);
        if (openDate && openDate > currDateAndTime) {
          return openDate;
        }
      }
    }
  }
  return null;
};

export const getOpeningStatus = (schedule: OpeningSchedule): OpeningStatus => {
  const now = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = daysOfWeek[now.getDay()];

  const isOpenToday = schedule.days.includes(today);
  if (isOpenToday) {
    for (const time of schedule.times) {
      const { isOpen, closesAt } = getCurrentTimeRangeStatus(now, time);
      if (isOpen && closesAt) {
        return { isOpen: true, closesAt };
      }
    }
  }

  const nextOpensAt = findNextOpening(now, schedule, daysOfWeek);
  return { isOpen: false, nextOpensAt };
};

export const convertStatusToMsg = (
  status: OpeningStatus,
  locale = "en-SG",
): string => {
  const date = status.isOpen ? status.closesAt : status.nextOpensAt;
  if (!date) return "Forever";

  const timeStr = date
    .toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const weekdayStr = date.toLocaleDateString(locale, {
    weekday: "short",
  });

  return status.isOpen ? `Closes ${timeStr}` : `Opens ${timeStr} ${weekdayStr}`;
};
