import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LOGIN_ROUTES } from './login.routes';
import { RouterModule } from '@angular/router';
import { MatModule } from '../mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    FlexLayoutModule,
    RouterModule.forChild(LOGIN_ROUTES)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }