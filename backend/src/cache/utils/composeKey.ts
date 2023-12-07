export function composeKey(...args: Array<string | number>): string {
  return args.join('_');
}
