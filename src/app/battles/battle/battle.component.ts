import { Component, Input } from '@angular/core';
import { FirebaseService } from '../../shared/firebase.service';

@Component({
  selector: 'battle-item',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
  @Input() battle: any;
  constructor(private fb: FirebaseService) { }

  selectWinner(battle, player) {

    const dataToBeUpdated = {
      "isFinish": true,
      "firstPlayer.winner": (player === "firstPlayer"),
      "secondPlayer.winner": (player === "secondPlayer")
    };

    this.fb.updateBattle(battle, dataToBeUpdated)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch(error => {
        console.error("Error updating document: ", error);
      });
  }
}
