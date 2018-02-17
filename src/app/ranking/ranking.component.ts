import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

import { MatTableDataSource } from '@angular/material'; 

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  battles:any;
  players:any;
  playersDataSource;
  displayedColumns = ['name', 'victory', 'defeat'];
  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    Observable
      .zip(this.fb.getBattles(), this.fb.getPlayers())
      .subscribe(this.setVictoryDefeatPlayers.bind(this));
  }

  setVictoryDefeatPlayers([battles, players]) {
    this.players = players.map(player => {

      player.victory = battles.filter(battle => 
        (battle.firstPlayer.name === player.name && battle.firstPlayer.winner) 
        || (battle.secondPlayer.name === player.name && battle.secondPlayer.winner)).length;

      player.defeat = battles.filter(battle => 
        (battle.firstPlayer.name === player.name && !battle.firstPlayer.winner) 
        || (battle.secondPlayer.name === player.name && !battle.secondPlayer.winner)).length;

      return player;
    });
    this.playersDataSource = new MatTableDataSource(this.players);
    console.log(this.players, this.playersDataSource);
  }

}
