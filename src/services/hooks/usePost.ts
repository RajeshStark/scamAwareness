import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { PostService } from "../post.service";

export const usePostList = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) =>
      PostService.list({ page: pageParam, pageLimit: 10 }).then(
        (res) => res.data
      ),
    getNextPageParam: (lastPage, allPages) => {
      const next = allPages.length + 1;
      return lastPage?.length === 10 ? next : undefined;
    },
  });
};

export const useUploadMedia = () =>
  useMutation({
    mutationFn: PostService.uploadMedia,
  });

export const useLike = () =>
  useMutation({
    mutationFn: PostService.like,
  });

export const useDislike = () =>
  useMutation({
    mutationFn: PostService.dislike,
  });
