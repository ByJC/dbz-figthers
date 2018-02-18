import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class FirebaseService {

    constructor(private db: AngularFirestore, public snackBar: MatSnackBar) { }

    /** 
     * In order to update the battle document, I need to catch the id of the document using snapshotChanges()
     * then merge the data and id into one object
    */
    getBattles() {
        return this.db.collection('battles').snapshotChanges().map(this.getIdData).map(this.sortByDate);
    }

    getWarriors() {
        return this.db.collection('warriors').valueChanges();
    }

    getPlayers() {
        return this.db.collection('players').snapshotChanges().map(this.getIdData);
    }

    /**
     * deleteBattle
     * @param battle 
     * In order to delete a battle, unused for the moment
     */
    deleteBattle(battle) {
        return this.db.collection('battles').doc(battle.id).delete().then(_ => this.snackBar.open('Battle deleted !','',{duration: 2000}));
    }

    addBattle(battle) {
        return this.db.collection('battles').add(battle).then(_ => this.snackBar.open('Battle added !','',{duration: 2000}));;
    }

    updateBattle(battle, updatedBattle) {
        return this.db.collection('battles').doc(battle.id)
            .update(updatedBattle).then(_ => this.snackBar.open('Battle updated !','',{duration: 2000}));;
    }

    updatePlayer(player, playerUpdated) {
        return this.db.collection('players').doc(player.id)
            .update(playerUpdated).then(_ => this.snackBar.open('Player updated !','',{duration: 2000}));;
    }

    getIdData(actions) {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        });
    }

    sortByDate(data){
        return data.sort((a,b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
    }

}