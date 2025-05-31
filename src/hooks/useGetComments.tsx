import { useInfiniteQuery } from "@tanstack/react-query";
import { PostService } from "../services/post.service";

export const usePaginatedComments = (postId) =>
  useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) =>
      PostService.getComment({ postId, page: pageParam, pageLimit: 10 }).then(
        (res) => res.data
      ),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage?.length === 10 ? nextPage : undefined;
    },
    enabled: !!postId,
  });
