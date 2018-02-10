import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './firebase.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [FirebaseService]
})
export class SharedModule { }