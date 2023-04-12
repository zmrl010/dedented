/**
 * Remove leading indentation from multi-line string while preserving
 * visual consistency with the original string.
 *
 * @param templateStrings - template literal(s) to interpolate
 * @param args - 0 or more arguments that are results of expressions
 * interpolated within the template strings (using `${expression}`)
 *
 * @returns string with indentation stripped
 */
export function dedent(
  templateStrings: TemplateStringsArray | string,
  ...args: unknown[]
): string {
  return "";
}
