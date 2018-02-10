import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Battle } from '../model/battle';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Warrior } from '../model/warrior';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-battles',
  templateUrl: './battles.component.html',
  styleUrls: ['./battles.component.scss']
})
export class BattlesComponent implements OnInit {

  battles: any = [];
  warriors: any;
  players: any;

  constructor(public dialog: MatDialog, private db: AngularFirestore) {}

  ngOnInit() {
    this.battles = this.db.collection('battles').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.warriors = this.db.collection('warriors').valueChanges();
    this.players = this.db.collection('players').valueChanges();
  }

  add(battle) {
    this.db.collection('battles').add(battle)
      .catch(error => console.error("Error writing document: ", error));
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

  deleteBattle(battle) {
    this.db.collection('battles').doc(battle.id)
    .delete()
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch(error => {
      console.error("Error updating document: ", error);
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BattlesDialog, { data: { warriors: this.warriors, players: this.players } });
    dialogRef.afterClosed().subscribe(result => this.add(result));
  }
}

@Component({
  selector: 'app-battles-modal',
  templateUrl: './battles-modal.html',
})
export class BattlesDialog {

  warriors;
  players;
  battle = {
    isFinish: false,
    date: new Date(),
    firstPlayer: {
      name: '',
      warriors : []
    }, 
    secondPlayer: {
      name:'',
      warriors : []
    }
  };
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<BattlesDialog>, private db: AngularFirestore, 
    @Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder) {
    data.warriors.subscribe(data => this.warriors = data);
    this.players = data.players;

    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      firstPlayerName: [this.battle.firstPlayer.name],
      firstPlayerWarriors: [this.battle.firstPlayer.warriors],
      secondPlayerName: [this.battle.secondPlayer.name],
      secondPlayerWarriors: [this.battle.secondPlayer.warriors],
    });

    this.form.valueChanges
      .subscribe((data) => {
        this.battle.firstPlayer.name = data.firstPlayerName.name;
        this.battle.firstPlayer.warriors = data.firstPlayerWarriors;
        this.battle.secondPlayer.name = data.secondPlayerName.name;
        this.battle.secondPlayer.warriors = data.secondPlayerWarriors;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.battle.date = new Date();
    this.dialogRef.close(this.battle);
  }

}
