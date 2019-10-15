import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-extpage',
  templateUrl: './extpage.component.html',
  styleUrls: ['./extpage.component.scss']
})
export class ExtPageComponent implements OnInit {

   height: string;
   site: string;

  constructor(private route: ActivatedRoute) { 
    this.height = (window.innerHeight - 87) + 'px';
  }

  ngOnInit() {
    this.route.params.subscribe( 
      params => { 
        //  this.site = params['site'];
        switch (params['site']) {
          case "site1": 
            this.site = 'http://squweli01'
          break;
          case "site2": 
            this.site = 'http://metuselzwweb01/specialty-team/'
          break;
          case "site3": 
          this.site = 'http://metuselzwweb01/dmes/'
          break;
          case "site4": 
          this.site = 'http://metuselzwweb01:83/'
          break;
          case "site5": 
          this.site = 'http://squweli01:8080/PowerBi/Home/EmbedReport'
          break;
          case "site6": 
          this.site = 'http://squweli01:8080/specialty-team-embeded'
          break;
          case "site7": 
          this.site = 'http://squweli01:8080/PowerBi/Home/QualityReport'
          break;
          case "site8": 
          this.site = 'http://squweli01:8080/PowerBi/Home/PressProductionReport'
          break;
          case "site9": 
          this.site = 'http://squweli01:8080/WorldBloomberg'
          break;

        }  
      } 
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = (window.innerHeight - 87) + 'px';
  

  }

}
