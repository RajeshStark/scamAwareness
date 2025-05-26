export const transformResponse = (res: any) => {
  const raw = res?.data?.output?.imageUrl1;
  if (!raw?.image?.length) return [];
  return raw.image.map((url: string) => ({
    type: raw.type,
    image: url,
  }));
};
