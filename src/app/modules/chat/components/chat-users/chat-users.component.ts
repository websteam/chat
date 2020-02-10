import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../chat.service";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-chat-users",
  templateUrl: "./chat-users.component.html",
  styleUrls: ["./chat-users.component.scss"]
})
export class ChatUsersComponent implements OnInit {
  private users: User[] = [];

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.getUsers().subscribe((users: User[]) => {
      console.log(users);

      this.users = users;
    });
  }
}
