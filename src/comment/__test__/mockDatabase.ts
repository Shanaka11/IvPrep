export const mockDatabase = {
  topic: [
    {
      id: 1,
      name: "Technology",
      active: true,
      createdAt: new Date("2024-01-01T10:00:00Z"),
      updatedAt: new Date("2024-01-01T10:00:00Z"),
    },
  ],
  question: [
    {
      id: 1,
      question: "What is the capital of France?",
      authorId: "author001",
      active: true,
      createdAt: new Date("2024-01-01T10:00:00Z"),
      updatedAt: new Date("2024-01-01T10:00:00Z"),
    },
  ],
  question_topic: [{ questionId: 1, topicId: 1 }],
};
