import { useQuery } from "@tanstack/react-query";
import { PostService } from "../services/post.service";

export const usePostDetail = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await PostService.list({
        page: 1,
        pageLimit: 1,
        postId,
      });

      console.log("RESPONSEEEEE", res?.data?.output);

      return res?.data?.output?.list[0];
    },
    enabled: !!postId,
  });
};
