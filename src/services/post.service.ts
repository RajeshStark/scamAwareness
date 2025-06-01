import { store } from "../redux/store/store";
import { Api } from "./api/Apis";
import { encodedCredentials, http } from "./api/http-client";

export const PostService = {
  list: (payload: { page: number; pageLimit: number; postId?: string }) =>
    http.post(Api.POST_LIST, payload),

  create: (payload: any) => http.post(Api.POST_CREATE, payload),

  share: (payload: any) => http.post(Api.POST_SHARE_COUNT, payload),

  like: (payload: { postId: string; type: number }) =>
    http.post(Api.POST_LIKE, payload),

  dislike: (payload: { id: string }) => http.post(Api.POST_DISLIKE, payload),

  comment: (payload: { postId: string; comment: string }) =>
    http.post(Api.POST_COMMENT, payload),

  getComment: (payload: { page: number; pageLimit: number; postId?: string }) =>
    http.post(Api.GET_COMMENTS, payload),

  reply: (payload: {
    postId: string;
    reply: string;
    commentId: string;
    repliedTo: string;
  }) => http.post(Api.POST_REPLY, payload),

  uploadMedia: (files: { uri: string; type: string; name: string }[]) => {
    const formData = new FormData();

    files.forEach((file) => {
      let mediaKey = "file";

      if (file.type.startsWith("image/")) {
        mediaKey = "image";
      } else if (file.type.startsWith("video/")) {
        mediaKey = "video";
      } else if (file.type.startsWith("audio/")) {
        mediaKey = "audio";
      }

      formData.append(mediaKey, {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });

    console.log("FormData built for upload:", formData);
    // return;
    return http.post(Api.UPLOAD_MULTIPLE_IMAGES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${encodedCredentials}`,
        accessToken: store?.getState()?.login.userToken,
      },
    });
  },

  addInterest: (payload: { postId: string }) =>
    http.post(Api.ADD_INTEREST_POST, payload),

  removeInterest: (payload: { postId: string }) =>
    http.post(Api.REMOVE_INTEREST_POST, payload),

  listInterest: (payload: { page: number; pageLimit: number }) =>
    http.post(Api.GET_INTEREST_POST, payload),
};
