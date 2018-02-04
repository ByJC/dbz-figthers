import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Battle } from '../model/battle';

@Component({
  selector: 'app-battles',
  templateUrl: './battles.component.html',
  styleUrls: ['./battles.component.scss']
})
export class BattlesComponent implements OnInit {

  battles: Battle[] = []; 

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.battles = [
      { id: 1,
        players: [
          { 
            name: 'Yoann', 
            id: 1, 
            warriors : [ 
              { id:1, name: 'Goku'},
              { id:2, name: 'Vegeta'},
              { id:3, name: 'Trunks'}
            ]
          },
          { 
            name: 'Jieff', 
            id: 2, 
            warriors : [ 
              { id:1, name: 'C-18'},
              { id:2, name: 'Cell'},
              { id:3, name: 'Freezer'}
            ]
          }
        ]
      }
    ];
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BattlesDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

@Component({
  selector: 'app-battles-modal',
  templateUrl: './battles-modal.html',
})
export class BattlesDialog {

  constructor(public dialogRef: MatDialogRef<BattlesDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
