/**
 * PromiseHandler module receives a promise, performs the suited treatment and lastly,
 * returns error and data respectively within an array struct.
 */
const promiseHandler = async (promise: Promise<any>) => {
  try {
    const data = await promise;

    return { data, err: undefined };
  } catch (err) {
    return { data: undefined, err: err as any };
  }
};

export default promiseHandler;
