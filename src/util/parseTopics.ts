export const parseTopics = (topics: string | string[] | undefined) => {
  if (topics === undefined) return [];
  if (Array.isArray(topics))
    return topics.map((item) => {
      const [id, name] = item.split(",");
      return { id: parseInt(id), name: name };
    });
  return [
    {
      id: parseInt(topics.split(",")[0]),
      name: topics.split(",")[1],
    },
  ];
};
