export const convertDatesToTimestamps = <GItem extends { created_at: Date }>(
  items: GItem[]
): (Omit<GItem, 'created_at'> & { created_at: number })[] => {
  return items.map((item) => ({ ...item, created_at: new Date(item.created_at).getTime() }));
};
