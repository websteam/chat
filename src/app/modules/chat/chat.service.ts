import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../shared/models/User";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";
import { Message } from 'src/app/shared/models/Message';
import { Observable, Subscription, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ChatService implements OnDestroy {
  private currentUser: User;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  /**
   * Send message to api via POST
   * 
   * @param content Message content
   */
  public sendMessage(content: string) {
    return this.http.post<Message>(environment.apiUrl + "/message", {
      content,
      user_id: this.currentUser.id
    });
  }

  public getMessages(refresh: boolean = false): Observable<Message[]> {
    // if (refresh || !this.messagesRequest) {
    //   this.messagesRequest = this.http.get<Message[]>(environment.apiUrl + "/message");

    //   this.messagesRequest.subscribe(
    //     result => this.messagesSubject.next(result),
    //     err => this.messagesSubject.error(err)
    //   );
    // }

    // return this.usersSubject.asObservable();

    return this.http.get<Message[]>(environment.apiUrl + "/message").pipe(map((messages: Message[]) => {
      return messages.map((message: Message) => {
        message.isMine = message.user.id == this.currentUser.id;

        return message;
      });
    }));
  }

  public ngOnDestroy() {

  }
}