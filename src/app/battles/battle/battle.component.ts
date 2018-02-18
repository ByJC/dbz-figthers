import { Component, Input } from '@angular/core';
import { FirebaseService } from '../../shared/firebase.service';
import { ProgressBarService } from '../../progressbar/progressbar.service';

@Component({
  selector: 'battle-item',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
  @Input() battle: any;
  constructor(private fb: FirebaseService, private $progressbar: ProgressBarService) { }

  selectWinner(battle, player) {
    this.$progressbar.show();
    const dataToBeUpdated = {
      "isFinish": true,
      "firstPlayer.winner": (player === "firstPlayer"),
      "secondPlayer.winner": (player === "secondPlayer")
    };
    
    this.fb.updateBattle(battle, dataToBeUpdated)
      .then(() => {
        this.$progressbar.hide();
        console.log("Document successfully updated!");
      })
      .catch(error => {
        this.$progressbar.hide();
        console.error("Error updating document: ", error);
      });
  }

  deleteBattle(battle) {
    this.$progressbar.show();
    this.fb.deleteBattle(battle)
    .then(() => {
      this.$progressbar.hide();
    })
    .catch(error => {
      this.$progressbar.hide();
      console.error("Error updating document: ", error);
    });

  }
}
