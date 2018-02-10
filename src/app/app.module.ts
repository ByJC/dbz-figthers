import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { MatModule } from './mat.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

const config = {
  apiKey: "AIzaSyBXAVB9ciUchzupead3EED2f5L5kLPeKW8",
  authDomain: "dbz-fighters.firebaseapp.com",
  databaseURL: "https://dbz-fighters.firebaseio.com",
  projectId: "dbz-fighters",
  storageBucket: "dbz-fighters.appspot.com",
  messagingSenderId: "1075795556668"
};

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatModule,
    AuthModule,
    SharedModule,
    AngularFireModule.initializeApp(config),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
