export type User = {
  _id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: string;
  avatar: string;
};

export type UsersResponse = {
  users: User[];
};
