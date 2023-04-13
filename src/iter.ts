type IterableCollection<T> = { [K in keyof T]: Iterable<T[K]> };

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
  ...iterables: IterableCollection<T>
): Generator<T> {
  const iterators = iterables.map((iter) => iter[Symbol.iterator]());

  while (iterables.length) {
    // advance all iterators
    const results = iterators.map((iter) => iter.next());

    if (results.some((r) => r.done)) {
      break;
    }

    yield results.map((r) => r.value) as T;
  }
}
