export const transformResponse = (res: any) => {
  const raw = res?.data?.output?.imageUrl1;

  if (!raw?.image?.length) return [];

  const getTypeFromUrl = (
    url: string
  ): "image" | "video" | "audio" | "other" => {
    const extension = url.split(".").pop()?.toLowerCase() || "";

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension))
      return "image";
    if (["mp4", "mov", "avi", "mkv", "webm"].includes(extension))
      return "video";
    if (["mp3", "wav", "m4a", "aac"].includes(extension)) return "audio";
    return "other";
  };

  return raw.image.map((url: string) => {
    const type = getTypeFromUrl(url);
    return { type, url };
  });
};

export const DEFAULT_AVATAR =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
