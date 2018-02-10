import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { MatModule } from '../mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { BattlesComponent } from '../battles/battles.component';
import { BattlesDialog } from '../battles/battles.component';
import { CONTENT_ROUTES } from './content.routes';
import { TagComponent } from '../tag/tag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BattlesPipe } from '../battles/battles.pipe';
import { BattleComponent } from '../battles/battle/battle.component';
import { PlayerComponent } from '../battles/player/player.component';

@NgModule({
  imports: [
    CommonModule, MatModule, FlexLayoutModule,ReactiveFormsModule,
    RouterModule.forChild(
      [
        {
            path: '',
            component: ContentComponent,
            children: [
                {
                    path: '',
                    component: BattlesComponent,
                    outlet: 'content'
                }
            ]
        }
    ]
    )
  ],
  declarations: [ContentComponent, BattlesComponent, BattlesDialog, TagComponent, BattlesPipe, BattleComponent, PlayerComponent], 
  entryComponents : [BattlesDialog]
})
export class ContentModule { }