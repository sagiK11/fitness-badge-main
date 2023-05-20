import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const apiConfig = {
  baseUrl: serverRuntimeConfig.API_ENDPOINT,
  publicBaseUrl: publicRuntimeConfig.NEXT_PUBLIC_API_ENDPOINT,
};
