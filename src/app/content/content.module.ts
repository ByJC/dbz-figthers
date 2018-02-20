import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { MatModule } from '../mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { BattlesComponent } from '../battles/battles.component';
import { ConfirmDialog } from '../battles/battle/battle.component';
import { TagComponent } from '../tag/tag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BattlesPipe } from '../battles/battles.pipe';
import { BattleComponent } from '../battles/battle/battle.component';
import { PlayerComponent } from '../battles/player/player.component';
import { RankingComponent } from '../ranking/ranking.component';
import { BattleformComponent } from '../battles/battleform/battleform.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { ProgressBarService } from '../progressbar/progressbar.service';

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
                    redirectTo: '/battles',
                    pathMatch: 'full'
                },
                {
                    path: 'battles',
                    component: BattlesComponent
                },
                {
                    path: 'battles/create',
                    component: BattleformComponent
                },
                {
                    path: 'ranking',
                    component: RankingComponent,
                }
            ]
        }
    ]
    )
  ],
  declarations: [ContentComponent, BattlesComponent, ConfirmDialog, TagComponent, BattlesPipe, 
    BattleComponent, PlayerComponent , RankingComponent, BattleformComponent, ProgressbarComponent],
  entryComponents : [ConfirmDialog],
  providers: [ProgressBarService]
})
export class ContentModule { }