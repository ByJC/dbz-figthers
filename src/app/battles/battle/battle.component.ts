import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'battle-item',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  @Input() battle: any;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {

  }

  selectWinner(battle, player) {
    let battleToUpdate = this.db.collection('battles').doc(battle.id);

    battleToUpdate.update({
      "isFinish": true,
      "firstPlayer.winner": (player === "firstPlayer"),
      "secondPlayer.winner": (player === "secondPlayer")
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch(error => {
      console.error("Error updating document: ", error);
    });
  }
}
