import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatModule } from '../mat.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatModule, 
    RouterModule.forChild([{
      path:'', component: HomeComponent
    }])
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }