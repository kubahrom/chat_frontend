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
  users: { name: string }[];
  authorId?: string;
};

export type ChatroomsData = {
  data: Chatrooms[];
};

export type ChatroomData = {
  data: Chatroom;
};
