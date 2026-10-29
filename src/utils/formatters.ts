/**
 * Persian number and currency formatting utilities
 */

export function toPersianDigits(num: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/[0-9]/g, (w) => farsiDigits[+w]);
}

export function formatToman(amount: number): string {
  const formatted = amount.toLocaleString('en-US');
  return `${toPersianDigits(formatted)} تومان`;
}

export function formatPercent(percent: number): string {
  return `${toPersianDigits(percent)}٪`;
}
