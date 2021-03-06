import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

import { MatTableDataSource, MatSort } from '@angular/material'; 
import { ProgressBarService } from '../progressbar/progressbar.service';

export interface Warrior {
  id: number;
  name: string;
  count: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  battles:any;
  players:any;
  warriors:Warrior[];
  playersDataSource;
  warriorsDataSource;
  displayedColumns = ['name', 'victory', 'defeat', 'diff', 'ratio', 'warriors'];
  displayedColumnsWarriors = ['name', 'count'];
  constructor(private fb: FirebaseService, private $progressbar: ProgressBarService) {}

  ngOnInit() {
    this.$progressbar.show();
    Observable
      .zip(this.fb.getBattles(), this.fb.getPlayers(), this.fb.getWarriors())
      .subscribe(this.setVictoryDefeatPlayers.bind(this));
  }

  setVictoryDefeatPlayers([battles, players, warriors]) {
    this.players = players.map(player => {

      player.victory = battles.filter(battle => 
        (battle.firstPlayer.name === player.name && battle.firstPlayer.winner) 
        || (battle.secondPlayer.name === player.name && battle.secondPlayer.winner)).length;

      player.defeat = battles.filter(battle => 
        (battle.firstPlayer.name === player.name && !battle.firstPlayer.winner) 
        || (battle.secondPlayer.name === player.name && !battle.secondPlayer.winner)).length;

      player.diff = player.victory - player.defeat;

      player.ratio = player.victory > 0 ? (player.victory / (player.victory + player.defeat)) * 100 : 0;

      return player;
    }).sort(this.sortBy('diff'));

    this.warriors = warriors.map(warrior => {
      warrior.count = battles.reduce((cumul, battle) => {
        return cumul + 
          battle.firstPlayer.warriors.filter(warriorib => warriorib.id === warrior.id).length +
          battle.secondPlayer.warriors.filter(warriorib => warriorib.name === warrior.name).length
      },0);
      return warrior;
    }).sort(this.sortBy('count'));

    this.playersDataSource = new MatTableDataSource(this.players);
    this.warriorsDataSource = new MatTableDataSource(this.warriors);
    this.warriorsDataSource.sort = this.sort;
    this.$progressbar.hide();
  }

  sortBy(key) {
    return (a,b) => a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
  }
}
