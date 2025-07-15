import { Rate } from "@/features/rates/services/ratesApiSlice";

export const groupRatesByCategory = (rates: Rate[]): Record<string, Rate[]> => {
  if (Array.isArray(rates) && rates.length === 0) {
    return {};
  }

  return rates.reduce<Record<string, Rate[]>>((map, rate) => {
    if (!map[rate.category]) {
      map[rate.category] = [];
    }
    map[rate.category].push(rate);
    return map;
  }, {});
};
