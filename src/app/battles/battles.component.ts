import { Component, OnInit } from '@angular/core';
import { Battle } from '../model/battle';
import { Observable } from 'rxjs/Observable';
import { Warrior } from '../model/warrior';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router } from '@angular/router';


@Component({
  selector: 'app-battles',
  templateUrl: './battles.component.html',
  styleUrls: ['./battles.component.scss']
})
export class BattlesComponent implements OnInit {

  battles: any;
  warriors: any;
  players: any;

  constructor(private fb: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.battles = this.fb.getBattles();
    this.warriors = this.fb.getWarriors();
    this.players = this.fb.getPlayers();
  }

  add(battle) {
    this.fb.addBattle(battle)
      .catch(error => console.error("Error writing document: ", error));
  }

  createBattle() {
    this.router.navigate(['/battles/create']);
  }
}
