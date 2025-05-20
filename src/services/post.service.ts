import { Api } from "./api/Apis";
import { http } from "./api/http-client";

export const PostService = {
  list: (payload: { page: number; pageLimit: number; searchKey?: string }) =>
    http.post(Api.POST_LIST, payload),

  create: (payload: any) => http.post(Api.POST_CREATE, payload),

  share: (payload: any) => http.post(Api.POST_SHARE_COUNT, payload),

  like: (payload: {
    postId: string;
    type: number;
    commentId?: string;
    replyId?: string;
  }) => http.post(Api.POST_LIKE, payload),

  uploadMedia: (files: { uri: string; type: string; name: string }[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });

    return http.post(Api.UPLOAD_MULTIPLE_IMAGES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  dislike: (payload: { id: string }) => http.post(Api.POST_DISLIKE, payload),

  comment: (payload: { postId: string; comment: string }) =>
    http.post(Api.POST_COMMENT, payload),

  reply: (payload: {
    postId: string;
    reply: string;
    commentId: string;
    repliedTo: string;
  }) => http.post(Api.POST_REPLY, payload),
};
