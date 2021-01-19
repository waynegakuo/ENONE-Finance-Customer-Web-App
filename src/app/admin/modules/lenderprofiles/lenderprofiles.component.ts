import { LenderService } from './../../services/lender/lender.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lenderprofiles',
  templateUrl: './lenderprofiles.component.html',
  styleUrls: ['./lenderprofiles.component.scss']
})
export class LenderprofilesComponent implements OnInit, OnDestroy {
  lenderProfiles;
  subs: Subscription;
  availableLenderProfiles: boolean;
  profileId;
  searchText = '';

  constructor(private lenders: LenderService, private router: Router) { }

  ngOnInit(): void {
    this.subs = this.lenders.getLenderProfiles().subscribe(
      data => {
        this.lenderProfiles = data;

        if (this.lenderProfiles.length === 0) {
          this.availableLenderProfiles = false;
        }
        else {
          this.availableLenderProfiles = true;
        }
      }
    );
    // this.lenderProfiles = this.lenders.getLenderProfiles();
  }

  /**
   * Method used to filter data by name
   * @param loan loan passed as parameter
   */
  // tslint:disable-next-line: typedef
  filterCondition(lenderProfile) {
    return lenderProfile.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }


  // tslint:disable-next-line: typedef
  onSelect(lenderProfile) {
    this.router.navigate(['admin/lenderprofiles', lenderProfile.id]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
