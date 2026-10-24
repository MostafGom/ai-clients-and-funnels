/** Illustrative future value of a fixed monthly contribution. Not a forecast: callers must show the assumption. */
export function futureValue(monthly: number, years: number, rate = 0.07): number {
  const r = rate / 12, n = years * 12;
  return monthly * ((1 + r) ** n - 1) / r;
}
export const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
