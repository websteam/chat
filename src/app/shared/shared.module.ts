import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppMaterialModule } from "./material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule],
  exports: [AppMaterialModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
