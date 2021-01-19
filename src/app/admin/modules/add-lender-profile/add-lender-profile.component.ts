import { LenderService } from './../../services/lender/lender.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-lender-profile',
  templateUrl: './add-lender-profile.component.html',
  styleUrls: ['./add-lender-profile.component.scss']
})
export class AddLenderProfileComponent implements OnInit {

  constructor(public lenders: LenderService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  createProfile(){
    this.lenders.createLenderProfile();
  }

}
