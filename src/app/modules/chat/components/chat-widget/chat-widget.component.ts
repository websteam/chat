import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { User } from "src/app/shared/models/User";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChatService } from "../../chat.service";
import { Message } from "src/app/shared/models/Message";

class MessagesContainer {
  recipent: User;
  messages: Message[] = [];
  isMine: boolean = false;

  constructor(recipent: User) {
    this.recipent = recipent;
  }
}

@Component({
  selector: "app-chat-widget",
  templateUrl: "./chat-widget.component.html",
  styleUrls: ["./chat-widget.component.scss"]
})
export class ChatWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
  public containers: MessagesContainer[] = [];
  public currentUser: User;
  public form: FormGroup;
  public interval: any;

  @ViewChild("messagesTrail", { static: false }) messagesTrail: ElementRef<
    HTMLDivElement
  >;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl("", [
        Validators.required,
        Validators.maxLength(255)
      ])
    });
  }

  ngAfterViewInit() {
    this.reloadMessages();
  }

  reloadMessages() {
    this.containers = [];
    let currentContainer: MessagesContainer = null;

    this.chat.getMessages().subscribe((messages: Message[]) => {
      messages.forEach((message: Message) => {
        if (
          !currentContainer ||
          currentContainer.recipent.id != message.user.id
        ) {
          this.containers.push(currentContainer = new MessagesContainer(message.user));
        }

        if (currentContainer) {
          currentContainer.messages.push(message);
        }
      });
    });

    setTimeout(() => {
      this.messagesTrail.nativeElement.scrollTop = this.messagesTrail.nativeElement.scrollHeight;
    });
  }

  onSubmit(event?: KeyboardEvent) {
    if (event instanceof KeyboardEvent && event.code == "Enter") {
      event.preventDefault();
    }

    if (this.form.invalid) {
      return;
    }

    this.chat.sendMessage(this.form.get("content").value).subscribe(() => {
      this.reloadMessages();
      this.form.get("content").setValue("");
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
