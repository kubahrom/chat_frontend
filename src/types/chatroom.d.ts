export type Chatrooms = {
  id: string;
  name: string;
  _count: {
    users: number;
  };
};

export type Chatroom = {
  id: string;
  name: string;
  users: { name: string; id: string }[];
  authorId?: string;
};

export type ChatRoomsCreateInput = {
  name: string;
  users?: string[];
};

export type ChatRoomsUpdateInput = {
  chatroomId: string;
  name?: string;
  users?: string[];
};
