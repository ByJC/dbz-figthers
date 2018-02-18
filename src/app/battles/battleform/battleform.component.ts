import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../shared/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battleform',
  templateUrl: './battleform.component.html',
  styleUrls: ['./battleform.component.scss']
})

export class BattleformComponent implements OnInit {

  warriors;
  players;
  playersToArray;
  battle = {
    isFinish: false,
    date: new Date(),
    firstPlayer: {
      name: '',
      warriors: []
    },
    secondPlayer: {
      name: '',
      warriors: []
    }
  };
  form: FormGroup;

  constructor(private _fb: FormBuilder, private fb: FirebaseService, private router: Router, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.fb.getWarriors().subscribe(data => this.warriors = data);
    this.players = this.fb.getPlayers();
    this.players.subscribe(res => {
      this.playersToArray = res;
    });
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      firstPlayerName: ['', Validators.required],
      firstPlayerWarriors: ['', Validators.required],
      secondPlayerName: ['', Validators.required],
      secondPlayerWarriors: ['', Validators.required],
    });

    this.form.valueChanges
      .subscribe((data) => {
        console.log(data);
        this.battle.firstPlayer.name = data.firstPlayerName.name;
        this.battle.firstPlayer.warriors = data.firstPlayerWarriors;
        this.battle.secondPlayer.name = data.secondPlayerName.name;
        this.battle.secondPlayer.warriors = data.secondPlayerWarriors;
      });

    ['firstPlayer', 'secondPlayer'].map(player => {
      this.form.controls[`${player}Name`]
        .valueChanges.subscribe(selectedValue => {
          const playerSelected = this.playersToArray.find(gamer => gamer.name === this.form.get(`${player}Name`).value.name);
          if (this.form.get(`${player}Warriors`).value.length === 0) {
            this.form.controls[`${player}Warriors`].setValue(playerSelected.warriors, { emitModelToViewChange: true });
            // this.form.patchValue({firstPlayerWarriors : playerSelected.warriors}), {emitModelToViewChange: true};
            // this.ref.markForCheck();
            this.ref.detectChanges();
          }
        });
    });
  }

  submit() {
    this.battle.date = new Date();
    this.fb.addBattle(this.battle)
      .then(res => this.router.navigate(['/battles']))
      .catch(error => console.error("Error writing document: ", error));
  }

  saveWarriorPlayer(player) {
    const playerName = this.form.get(`${player}Name`).value.name;
    const playerSelected = this.playersToArray.find(player => player.name === playerName);
    this.fb.updatePlayer(playerSelected, { warriors: this.form.get(`${player}Warriors`).value })
      .catch(error => console.error("Error writing document: ", error));
  }

  cancel() {
    this.router.navigate(['battles']);
  }

}
