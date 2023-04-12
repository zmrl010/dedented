/**
 * Iterate over several iterables in parallel, producing
 * tuples with an item from each one. The returned iterator
 * will iterate as many times as the shortest input iterator.
 *
 * Inspired by the python builtin `zip`.
 *
 * @param iterables - collection of iterables to 'zip'
 */
export function* zip<T extends unknown[]>(
  ...iterables: { [K in keyof T]: Iterable<T>[] }
): Generator<T> {
  const iterators = iterables.map((iter) => iter[Symbol.iterator]());

  while (true) {
    // advance all iterators
    const results = iterators.map((iter) => iter.next());

    // if any iterators are done, stop
    if (results.some((r) => r.done)) {
      break;
    }

    yield results.map((r) => r.value) as T;
  }
}
