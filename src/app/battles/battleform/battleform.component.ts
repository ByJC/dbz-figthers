import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  constructor(private _fb: FormBuilder,  private fb: FirebaseService, private router: Router) {
  }

  ngOnInit() {
    this.fb.getWarriors().subscribe(data => this.warriors = data);
    this.players = this.fb.getPlayers();
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

  submit() {
    this.battle.date = new Date();
    this.fb.addBattle(this.battle)
      .then(res =>  this.router.navigate(['/battles']))
      .catch(error => console.error("Error writing document: ", error));
  }

}
