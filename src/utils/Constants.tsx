export const transformResponse = (res: any) => {
  const raw = res?.data?.output?.imageUrl1;

  if (!raw?.image?.length) return [];

  return raw.image.map((url: string) => {
    const type = raw.type;

    if (type === "image") {
      return { type, image: url };
    } else if (type === "video") {
      return { type, video: url };
    } else if (type === "audio") {
      return { type, audio: url };
    } else {
      return { type, url };
    }
  });
};
