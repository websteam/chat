import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from "../../chat.service";

class Message {
  content: string;
  user_id: number;
  created: Date;
  isMine: boolean = false;

  constructor() {
    console.log('ima constructed');

    this.isMine = false;
  }
}

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  public messages: Message[];
  public currentUser: User;
  public form: FormGroup;

  constructor(private chat: ChatService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl("", [Validators.required, Validators.maxLength(255)])
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.chat.sendMessage(this.form.get('content').value).subscribe(response => {
      console.log(response);
    });
  }

}
