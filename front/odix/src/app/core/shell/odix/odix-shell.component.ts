import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { DataService } from '@app/services/data.service';

declare var $: any;

@Component({
  selector: 'odix-shell',
  templateUrl: './odix-shell.component.html',
  styleUrls: ['./odix-shell.component.scss']
})
export class OdixShellComponent implements OnInit, AfterViewInit {

  activeSidebar: boolean; // if is true then hidde sidebar,
  //isPushable: boolean; // this variable control if the menu is pushable or not
  loading: boolean;

  constructor(private router: Router, private dataService: DataService) {
    this.activeSidebar = true;
    //this.isPushable = false; // the menu is not pushable
   }

  ngOnInit() {

    	    // get loading state
          this.dataService.currentLoading.subscribe( (loading:any) => this.loading = loading );
          /*this.router.events.subscribe((events) => {
            if (events instanceof NavigationStart) {
              // hidden nav menu and all elements
             this.activeSidebar = true;
             $('.send-a-message').toggleClass('send-a-message-closed');
             $('.download-mobile').toggleClass('download-mobile-closed');
           }
           
         });*/
  }

  ngAfterViewInit() { }

  onActiveSidebar(active: boolean): void {
    this.activeSidebar = active;
  }

}
