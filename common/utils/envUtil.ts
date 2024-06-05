/**
 * 读取所有环境变量, 只读NUXT_开头的变量
 * Read all environment variables, Read only variables beginning with NUXT_.
 * @returns
 */
export const readEnvs = () => {
  return {
    ...Object.entries(process.env).reduce(
      (acc, [key, value]) =>
        key.startsWith("NUXT_") ? { ...acc, [key]: value } : acc,
      {}
    ),
  };
};

/**
 * 读取某个环境变量，结果为字符串
 * Read an environment variable as a string.
 * @returns
 */
export const readString = (
  envs: { [key: string]: string },
  key: string
): string => {
  return envs[key] || "";
};

/**
 * 读取某个环境变量，结果为Number
 * Read an environment variable as a number.
 * @returns
 */
export const readNumber = (
  envs: { [key: string]: string },
  key: string
): number => {
  return Number(envs[key]) || 0;
};
