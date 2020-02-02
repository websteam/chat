import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./components/chat/chat.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';

@NgModule({
  declarations: [ChatComponent, ChatUsersComponent, ChatWidgetComponent],
  imports: [CommonModule, SharedModule, ChatRoutingModule]
})
export class ChatModule {}
