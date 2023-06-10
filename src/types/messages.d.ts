export type Message = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
};

export type GetMessagesInputs = {
  id: string;
};

export type AddMessageInputs = {
  id: string;
  content: string;
};
