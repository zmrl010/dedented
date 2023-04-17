import { dedent } from "dedented";
import { describe, expect, it } from "vitest";

/**
 * @fileoverview
 *
 * Test suite for `dedent()`
 *
 * Thanks to `ts-dedent` library for most (all) of the test cases
 * @see {@link https://github.com/tamino-martinius/node-ts-dedent/blob/18c4736c79806d7fe78bdaaaf5ae307b79f9574a/src/__tests__/index.spec.ts}
 */

/**
 * Alternative tagged template function
 */
function tag(strings: TemplateStringsArray, ...values: number[]) {
  let string = strings[0];

  values.forEach((value, i) => {
    string += 2 * value + strings[i + 1];
  });

  return string;
}

describe("dedent tag", () => {
  it("should work with empty string", () => {
    expect(dedent``).toEqual("");
  });

  it("should work with tabs", () => {
    expect(dedent`Line #1
			Line #2
			Line #3`).toEqual("Line #1\nLine #2\nLine #3");

    expect(dedent`Line #${1}
			Line #${2}
			Line #${3}`).toEqual("Line #1\nLine #2\nLine #3");

    expect(dedent`${1}. line #${1}
			${2}. line #${2}
			${3}. line`).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should work with spaces", () => {
    expect(dedent`Line #1
            Line #2
            Line #3`).toEqual("Line #1\nLine #2\nLine #3");

    expect(dedent`Line #${1}
            Line #${2}
            Line #${3}`).toEqual("Line #1\nLine #2\nLine #3");

    expect(dedent`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should remove leading/trailing line break", () => {
    expect(
      dedent`
			Line #1
			Line #2
			Line #3
			`
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent`
Line #1
	Line #2
	Line #3
			`
    ).toEqual("Line #1\n\tLine #2\n\tLine #3");

    expect(
      dedent`
			Line #${1}
			Line #${2}
			Line #${3}
			`
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent`
Line #${1}
	Line #${2}
	Line #${3}
			`
    ).toEqual("Line #1\n\tLine #2\n\tLine #3");

    expect(
      dedent`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`
    ).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should not remove more than one leading/trailing line break", () => {
    expect(
      dedent`

			Line #1
			Line #2
			Line #3

			`
    ).toEqual("\nLine #1\nLine #2\nLine #3\n");

    expect(
      dedent`

			Line #${1}
			Line #${2}
			Line #${3}

			`
    ).toEqual("\nLine #1\nLine #2\nLine #3\n");

    expect(
      dedent`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`
    ).toEqual("\n1. line #1\n2. line #2\n3. line\n");
  });

  it("should remove the same number of tabs/spaces from each line", () => {
    expect(
      dedent`
			Line #1
				Line #2
					Line #3
			`
    ).toEqual("Line #1\n\tLine #2\n\t\tLine #3");

    expect(
      dedent`
			Line #${1}
				Line #${2}
					Line #${3}
			`
    ).toEqual("Line #1\n\tLine #2\n\t\tLine #3");

    expect(
      dedent`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`
    ).toEqual("1. line #1\n\t2. line #2\n\t\t3. line");
  });

  it("should ignore the last line if it doesn't contain anything else than whitespace", () => {
    expect(
      (() => {
        return dedent`
					Line #1
					Line #2
					Line #3
				`;
      })()
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      (() => {
        return dedent`
					Line #${1}
					Line #${2}
					Line #${3}
				`;
      })()
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      (() => {
        return dedent`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`;
      })()
    ).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should process escape sequences", () => {
    expect(
      (() => {
        return dedent`
          \${not interpolated}
          \`
        `;
      })()
    ).toEqual("${not interpolated}\n`");
  });

  it("should dedent nested calls correctly", () => {
    const fieldDocs = dedent`
      * a
      * b
      * c
    `;

    const a = dedent`
      /**
       ${fieldIntro()}
       *
       ${fieldDocs}
       *
       ${fieldExample()}
       */
    `;

    function fieldIntro() {
      return dedent`
        * 0
      `;
    }
    function fieldExample() {
      return dedent`
        * d
      `;
    }

    const expected = `/**
 * 0
 *
 * a
 * b
 * c
 *
 * d
 */`;

    expect(a).toEqual(expected);
  });
});

describe("dedent() function", () => {
  it("should work with tabs", () => {
    expect(
      dedent(`Line #1
			Line #2
			Line #3`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(`Line #${1}
			Line #${2}
			Line #${3}`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(`${1}. line #${1}
			${2}. line #${2}
			${3}. line`)
    ).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should work with spaces", () => {
    expect(
      dedent(`Line #1
            Line #2
            Line #3`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(`Line #${1}
            Line #${2}
            Line #${3}`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`)
    ).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should remove leading/trailing line break", () => {
    expect(
      dedent(`
			Line #1
			Line #2
			Line #3
			`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(`
Line #1
	Line #2
	Line #3
			`)
    ).toEqual("Line #1\n\tLine #2\n\tLine #3");

    expect(
      dedent(`
			Line #${1}
			Line #${2}
			Line #${3}
			`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(`
Line #${1}
	Line #${2}
	Line #${3}
			`)
    ).toEqual("Line #1\n\tLine #2\n\tLine #3");

    expect(
      dedent(`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`)
    ).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should not remove more than one leading/trailing line break", () => {
    expect(
      dedent(`

			Line #1
			Line #2
			Line #3

			`)
    ).toEqual("\nLine #1\nLine #2\nLine #3\n");

    expect(
      dedent(`

			Line #${1}
			Line #${2}
			Line #${3}

			`)
    ).toEqual("\nLine #1\nLine #2\nLine #3\n");

    expect(
      dedent(`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`)
    ).toEqual("\n1. line #1\n2. line #2\n3. line\n");
  });

  it("should remove the same number of tabs/spaces from each line", () => {
    expect(
      dedent(`
			Line #1
				Line #2
					Line #3
			`)
    ).toEqual("Line #1\n\tLine #2\n\t\tLine #3");

    expect(
      dedent(`
			Line #${1}
				Line #${2}
					Line #${3}
			`)
    ).toEqual("Line #1\n\tLine #2\n\t\tLine #3");

    expect(
      dedent(`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`)
    ).toEqual("1. line #1\n\t2. line #2\n\t\t3. line");
  });

  it("should ignore the last line if it doesn't contain anything else than whitespace", () => {
    expect(
      (() => {
        return dedent(`
					Line #1
					Line #2
					Line #3
				`);
      })()
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      (() => {
        return dedent(`
					Line #${1}
					Line #${2}
					Line #${3}
				`);
      })()
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      (() => {
        return dedent(`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`);
      })()
    ).toEqual("1. line #1\n2. line #2\n3. line");
  });

  it("should process escape sequences", () => {
    expect(
      dedent(`
          \${not interpolated}
          \`
        `)
    ).toEqual("${not interpolated}\n`");
  });
});

describe("dedent() function with custom tag", () => {
  it("should work with tabs", () => {
    expect(
      dedent(tag`Line #1
			Line #2
			Line #3`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(tag`Line #${1}
			Line #${2}
			Line #${3}`)
    ).toEqual("Line #2\nLine #4\nLine #6");

    expect(
      dedent(tag`${1}. line #${1}
			${2}. line #${2}
			${3}. line`)
    ).toEqual("2. line #2\n4. line #4\n6. line");
  });

  it("should work with spaces", () => {
    expect(
      dedent(tag`Line #1
            Line #2
            Line #3`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(tag`Line #${1}
            Line #${2}
            Line #${3}`)
    ).toEqual("Line #2\nLine #4\nLine #6");

    expect(
      dedent(tag`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`)
    ).toEqual("2. line #2\n4. line #4\n6. line");
  });

  it("should remove leading/trailing line break", () => {
    expect(
      dedent(tag`
			Line #1
			Line #2
			Line #3
			`)
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      dedent(tag`
Line #1
	Line #2
	Line #3
			`)
    ).toEqual("Line #1\n\tLine #2\n\tLine #3");

    expect(
      dedent(tag`
			Line #${1}
			Line #${2}
			Line #${3}
			`)
    ).toEqual("Line #2\nLine #4\nLine #6");

    expect(
      dedent(tag`
Line #${1}
	Line #${2}
	Line #${3}
			`)
    ).toEqual("Line #2\n\tLine #4\n\tLine #6");

    expect(
      dedent(tag`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`)
    ).toEqual("2. line #2\n4. line #4\n6. line");
  });

  it("should not remove more than one leading/trailing line break", () => {
    expect(
      dedent(tag`

			Line #1
			Line #2
			Line #3

			`)
    ).toEqual("\nLine #1\nLine #2\nLine #3\n");

    expect(
      dedent(tag`

			Line #${1}
			Line #${2}
			Line #${3}

			`)
    ).toEqual("\nLine #2\nLine #4\nLine #6\n");

    expect(
      dedent(tag`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`)
    ).toEqual("\n2. line #2\n4. line #4\n6. line\n");
  });

  it("should remove the same number of tabs/spaces from each line", () => {
    expect(
      dedent(tag`
			Line #1
				Line #2
					Line #3
			`)
    ).toEqual("Line #1\n\tLine #2\n\t\tLine #3");

    expect(
      dedent(tag`
			Line #${1}
				Line #${2}
					Line #${3}
			`)
    ).toEqual("Line #2\n\tLine #4\n\t\tLine #6");

    expect(
      dedent(tag`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`)
    ).toEqual("2. line #2\n\t4. line #4\n\t\t6. line");
  });

  it("should ignore the last line if it doesn't contain anything else than whitespace", () => {
    expect(
      (() => {
        return dedent(tag`
					Line #1
					Line #2
					Line #3
				`);
      })()
    ).toEqual("Line #1\nLine #2\nLine #3");

    expect(
      (() => {
        return dedent(tag`
					Line #${1}
					Line #${2}
					Line #${3}
				`);
      })()
    ).toEqual("Line #2\nLine #4\nLine #6");

    expect(
      (() => {
        return dedent(tag`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`);
      })()
    ).toEqual("2. line #2\n4. line #4\n6. line");
  });

  it("should process escape sequences", () => {
    expect(
      dedent(tag`
          \${not interpolated}
          \`
        `)
    ).toEqual("${not interpolated}\n`");
  });
});
