
/**
 * Promisified setTimeout
 */
export const wait = (ms: number = 5000) => new Promise(
  (resolve, reject) => setTimeout(resolve, ms)
);
