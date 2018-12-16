export default async (f) => {
    return async (...args) => {
    console.log(1);
    const value = await f(...args)
    console.log(2);
    return value
    }
}