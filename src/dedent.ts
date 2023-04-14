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
  let strings = [templateStrings].flat();

  // remove up to 1 line trailing whitespace
  strings[strings.length - 1] = strings[strings.length - 1].replace(
    /\r?\n([\t ]*)$/,
    ""
  );

  // find highest common indentation (HCI)
  const indentLengths = strings.flatMap((value) => {
    const matches = value.match(/\n([\t ]+|(?!\s).)/g);

    if (!matches) {
      return [];
    }

    return matches.map((match) => match.match(/[\t ]/g)?.length ?? 0);
  });

  // remove the common indentation from all strings
  if (indentLengths.length) {
    const pattern = new RegExp(`\n[\t ]{${Math.min(...indentLengths)}}`, "g");

    strings = strings.map((str) => str.replace(pattern, "\n"));
  }

  // remove leading whitespace
  strings[0] = strings[0].replace(/^\r?\n/, "");

  // perform interpolation
  let result = strings[0];

  for (let i = 0; i < args.length; i++) {
    // a. read current indentation level
    const indentation = result.match(/(?:^|\n)( *)$/)?.[1] ?? "";
    let indentedArg = args[i];
    // b. add indentation to values with multiline strings
    if (typeof indentedArg === "string" && indentedArg.includes("\n")) {
      indentedArg = String(indentedArg)
        .split("\n")
        .map((str, i) => (i === 0 ? str : `${indentation}${str}`))
        .join("\n");
    }

    result += indentedArg + strings[i + 1];
  }

  return result;
}
