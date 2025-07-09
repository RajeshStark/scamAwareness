type MediaItem = {
  type: string;
  url: string;
};

type like = {
  _id: string;
  createdAt: string;
  likedBy: string;
  postId: string;
  type: number;
  updatedAt: string;
}[];

export type PostCardProps = {
  userDetails: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }[];
  description: string;
  name: string;
  media: MediaItem[];
  commentCount: number;
  likeCount: number;
  shareCount: number;
  noShadow?: boolean;
  isLiked?: boolean;
  isInterested?: boolean;
  _id: string;
  like: like;
  from: string;
};
