import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'player-item',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: any;
  constructor() { }

  ngOnInit() {
  }

}
