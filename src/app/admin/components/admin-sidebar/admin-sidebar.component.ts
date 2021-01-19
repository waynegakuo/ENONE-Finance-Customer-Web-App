import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  @Input() displayName;
  @Input() email;

  constructor() { }

  ngOnInit(): void {
  }

}
