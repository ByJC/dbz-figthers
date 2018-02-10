import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirebaseService {

    constructor(private db: AngularFirestore) { }

    /** 
     * In order to update the battle document, I need to catch the id of the document using snapshotChanges()
     * then merge the data and id into one object
    */
    getBattles() {
        return this.db.collection('battles').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }

    getWarriors() {
        return this.db.collection('warriors').valueChanges();
    }

    getPlayers() {
        return this.db.collection('players').valueChanges();
    }

    /**
     * deleteBattle
     * @param battle 
     * In order to delete a battle, unused for the moment
     */
    deleteBattle(battle) {
        return this.db.collection('battles').doc(battle.id).delete();
    }

    addBattle(battle) {
        return this.db.collection('battles').add(battle);
    }

    updateBattle(battle, updatedBattle) {
        return this.db.collection('battles').doc(battle.id)
            .update(updatedBattle);
    }

}