import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // @Input() userDetails;
  @Input() displayName;
  @Input() email;

  constructor() { }

  ngOnInit(): void {
  }

}
