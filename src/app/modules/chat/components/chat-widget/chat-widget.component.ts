import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/User";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChatService } from "../../chat.service";
import { Message } from "src/app/shared/models/Message";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-chat-widget",
  templateUrl: "./chat-widget.component.html",
  styleUrls: ["./chat-widget.component.scss"]
})
export class ChatWidgetComponent implements OnInit {
  public messages: Message[];
  public currentUser: User;
  public form: FormGroup;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl("", [
        Validators.required,
        Validators.maxLength(255)
      ])
    });

    setInterval(() => {
      this.reloadMessages();
    }, 2500);
  }

  reloadMessages() {
    this.chat.getMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  onSubmit(event?: KeyboardEvent) {
    if (event instanceof KeyboardEvent && event.code == "Enter") {
      event.preventDefault();
    }

    if (this.form.invalid) {
      return;
    }

    this.chat
      .sendMessage(this.form.get("content").value)
      .subscribe(response => {
        this.reloadMessages();
        this.form.get("content").reset();
      });
  }
}
