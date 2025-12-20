export const ENV = {
  get IS_DEV() {
    return process.env.NODE_ENV === "development";
  },
  get IS_PROD() {
    return process.env.NODE_ENV === "production";
  },
  get IS_TEST() {
    return process.env.NODE_ENV === "test";
  },
};