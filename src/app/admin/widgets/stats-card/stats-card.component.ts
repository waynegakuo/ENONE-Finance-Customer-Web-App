import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {
  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
