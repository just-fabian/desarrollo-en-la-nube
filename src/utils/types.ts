import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  name: string;
  address: string;
  birthDate: any;
  email: string;
  createdAt: number;
}

export interface Post {
  id: string;
  uid: string;
  content: string;
  imageUrl: string;
  createdAt: Timestamp;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  postId: string;
  isRead: boolean;
  createdAt: Timestamp;
}
