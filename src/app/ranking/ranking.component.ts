import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  battles:any;
  ObservablesBattles;
  players:any;
  ObservablesPlayers;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.ObservablesBattles = this.db.collection('battles').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.ObservablesPlayers = this.db.collection('players').valueChanges();

    Observable
      .zip(this.ObservablesBattles, this.ObservablesPlayers)
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
  }

}
