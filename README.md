# Dedent(ed)

A simple utility that strips indentation from multi-line strings.

## 👉 Features 👈

* Strip indentation from multi-line strings
* Tagged template literal syntax
* Function call syntax
* Developed in TypeScript for complete typing support
* Exports ECMAScript module (ESM)

## 🏗 Install

Install with your favorite package manager

```shell
pnpm add dedented
# or 
npm add dedented
# or 
yarn add dedented
```

## 💻 Usage

Simply import the function and use it!

```ts
import { dedent } from 'dedented';

const value = dedent`Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit. Curabitur ac est imperdiet, 
                     ullamcorper ex eu, dapibus felis. Quisque 
                     vitae leo non arcu viverra tristique id vitae 
                     nibh. 

                      * Suspendisse condimentum volutpat condimentum. 
                      * Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                      * Nullam posuere accumsan ipsum a rutrum. 
                  
                     Etiam imperdiet justo eu commodo varius. Quisque pharetra 
                     aliquam vulputate.`

console.log(value)
```

You'll see that `value` evaluates to the same text you entered, but with any leading indentation stripped from each line:

```text
Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Curabitur ac est imperdiet, 
ullamcorper ex eu, dapibus felis. Quisque 
vitae leo non arcu viverra tristique id vitae 
nibh. 

 * Suspendisse condimentum volutpat condimentum. 
 * Interdum et malesuada fames ac ante ipsum primis in faucibus. 
 * Nullam posuere accumsan ipsum a rutrum. 

Etiam imperdiet justo eu commodo varius. Quisque pharetra 
aliquam vulputate.
```

## Credits

This library draws heavily from:

* [ts-dedent](https://github.com/tamino-martinius/node-ts-dedent) (test suite and implementation)
* [dedent](https://github.com/dmnd/dedent) (inspiration)
