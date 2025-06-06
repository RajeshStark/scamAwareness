import { Api } from "./api/Apis";
import { ApiResponse, http } from "./api/http-client";

type SearchPayload = {
  search: string;
};

export const search = async (payload: SearchPayload) => {
  const response = await http.post<ApiResponse<any>>(Api.SEARCH, payload);
  return response.data;
};
