import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProgressBarService } from './progressbar.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  providers:[]
})

export class ProgressbarComponent implements OnInit {

  isDisplay : boolean;

  constructor(private $progressbar : ProgressBarService) { }

  ngOnInit() {
    this.$progressbar
      .changes
      .subscribe((display : boolean) => { this.isDisplay = display; });
  }

}
