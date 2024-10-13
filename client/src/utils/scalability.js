import { memoize } from "lodash";

export const cachingMiddleware = (func, ttl = 60000) => {
  const memoizedFunc = memoize(func, (...args) => JSON.stringify(args));

  return async (...args) => {
    const result = await memoizedFunc(...args);
    setTimeout(() => memoizedFunc.cache.delete(JSON.stringify(args)), ttl);
    return result;
  };
};

export const retryWithBackoff = async (
  func,
  maxRetries = 3,
  baseDelay = 1000
) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await func();
    } catch (error) {
      retries++;
      if (retries === maxRetries) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, baseDelay * Math.pow(2, retries))
      );
    }
  }
};

export const batchRequests = async (requests, batchSize = 10) => {
  const results = [];
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((req) => req()));
    results.push(...batchResults);
  }
  return results;
};
