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
  const strings = [templateStrings].flat();

  // first, perform interpolation
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i]
      // join lines when there is a suppressed newline
      .replace(/\\\n[ \t]*/g, "")
      // handle escaped backticks
      .replace(/\\`/g, "`");

    if (i < args.length) {
      result += args[i];
    }
  }

  // now strip indentation
  const lines = result.split("\n");
  let mindent: number | null = null;
  lines.forEach((l) => {
    let m = l.match(/^(\s+)\S+/);
    if (m) {
      let indent = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    const m = mindent; // appease Flow
    result = lines.map((l) => (l[0] === " " ? l.slice(m) : l)).join("\n");
  }

  return (
    result
      // dedent eats leading and trailing whitespace too
      .trim()
      // handle escaped newlines at the end to ensure they don't get stripped too
      .replace(/\\n/g, "\n")
  );
}
