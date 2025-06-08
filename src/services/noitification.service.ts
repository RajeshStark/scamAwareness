import { Api } from "./api/Apis";
import { http } from "./api/http-client";

export const getNotifications = async ({ pageParam = 1 }) => {
  const payload = {
    page: pageParam,
    pageLimit: 10,
  };

  const response = await http.post(Api.GET_NOTIFICATION, payload);
  return {
    notifications: response.data.output.list,
    nextPage: response.data.output.list.length > 0 ? pageParam + 1 : null,
  };
};
