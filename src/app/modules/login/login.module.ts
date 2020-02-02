import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from "src/app/shared/material.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class LoginModule {}
