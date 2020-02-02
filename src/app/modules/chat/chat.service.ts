import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../shared/models/User";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ChatService {
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
    return this.http.post(environment.apiUrl + "/message/add", {
      content
    });
  }
}
