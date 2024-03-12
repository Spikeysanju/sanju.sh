// merge class names with conditional rendering
export function clsx(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}