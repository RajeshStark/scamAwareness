import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
    onError: (err) => {
      console.log("Error", err?.response);
    },
  });

export const useLike = () =>
  useMutation({
    mutationFn: PostService.like,
  });

export const useDislike = () =>
  useMutation({
    mutationFn: PostService.dislike,
  });

export const useComment = () =>
  useMutation({
    mutationFn: PostService.comment,
  });

export const useGetComments = () =>
  useMutation({
    mutationFn: PostService.getComment,
  });

export const useReply = () =>
  useMutation({
    mutationFn: PostService.reply,
  });

export const useAddInterest = () =>
  useMutation({
    mutationFn: PostService.addInterest,
  });

export const useRemoveInterest = () =>
  useMutation({
    mutationFn: PostService.removeInterest,
  });

export const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interestpost"] });
    },
  });
};

export const useGetInterest = () => {
  return useInfiniteQuery({
    queryKey: ["interestpost"],
    queryFn: ({ pageParam = 1 }) =>
      PostService.listInterest({ page: pageParam, pageLimit: 10 }).then(
        (res) => res.data
      ),
    getNextPageParam: (lastPage, allPages) => {
      const next = allPages.length + 1;
      return lastPage?.length === 10 ? next : undefined;
    },
  });
};
