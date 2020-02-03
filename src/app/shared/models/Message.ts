import { User } from "./User";

export class Message {
  content: string;
  user_id: number;
  created: any;
  isMine: boolean = false;
  user: User;
}
