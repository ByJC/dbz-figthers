import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'battle-item',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  @Input() battle: any;
  constructor() { }

  ngOnInit() {

  }
}
