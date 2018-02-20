import { Component, Input, Inject } from '@angular/core';
import { FirebaseService } from '../../shared/firebase.service';
import { ProgressBarService } from '../../progressbar/progressbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'battle-item',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
  @Input() battle: any;
  constructor(private fb: FirebaseService, private $progressbar: ProgressBarService, private dialog: MatDialog) { }

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


  confirmWinner(battle, player): void {
    let dialogRef = this.dialog.open(ConfirmDialog, { data : { player, battle }});
    dialogRef.afterClosed().subscribe(res => {
      if(res) { this.selectWinner(battle, player); }
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

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.html',
})
export class ConfirmDialog {
  battle;
  player;

  constructor(public dialogRef: MatDialogRef<ConfirmDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.battle = data.battle;
      this.player = data.player;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }

}
