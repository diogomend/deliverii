import axios from "axios";
import store from "@/store";

export const accessTokenHeader = "X-Access-Token";
export const refreshTokenHeader = "X-Refresh-Token";

const api = axios.create({
  baseURL: process.env.VUE_APP_API
});

api.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
);

function responseSuccessInterceptor(response) {
  return response;
}

async function responseErrorInterceptor(error) {
  const { response } = error;
  if (
    response &&
    response.data &&
    response.data.statusCode &&
    response.data.message
  ) {
    await store.dispatch(
      "appState/addAlert",
      {
        type: "error",
        message: `${response.data.statusCode} - ${response.data.message}`
      },
      { root: true }
    );
  }
  throw error;
}

export default api;
