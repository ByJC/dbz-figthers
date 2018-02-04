import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlesComponent } from './battles.component';
import { RouterModule } from '@angular/router';
import { MatModule } from '../mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [
    CommonModule,
    MatModule,
    FlexLayoutModule,
    RouterModule.forChild([{
      path:'', component: BattlesComponent
    }])
  ],
  declarations: [BattlesComponent]
})
export class BattlesModule { }