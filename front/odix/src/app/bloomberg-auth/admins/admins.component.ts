import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdminUserService } from '../admins/categories/user/admin-user.service';
import { I18nService} from '@app/core';
import { TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, OnDestroy {
  adminList: any;
  adminList2: any;

  selectedAdmin = '';
  plantName:string = ""
  typeReport: string = ""
  idView: string = ""
  qualitySub = false;
  teamSub = false;
  wrap = false;

  countryFlag : string;
  currentLanguage : string;
  lang : any;
  pasoVar: string;
  lenguaje: string;

  constructor( private route: ActivatedRoute, private router: Router, private userService: AdminUserService, public translateService: TranslateService, private i18nService: I18nService,) {
    this.selectedAdmin = this.route.snapshot.paramMap.get('typeadmin');  
    this.plantName = this.route.snapshot.paramMap.get('plantName'); 
    this.typeReport = this.route.snapshot.paramMap.get('typereport'); 
    this.idView = this.route.snapshot.paramMap.get('idView');


    const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');

    let finalJs = JSON.parse(savedCredentials);

    this.userService.getLang(finalJs.username).subscribe(res => {
      console.log("LANGUAGE",res);
      this.lang = res.language
      this.i18nService.language = this.lang 
    });

    this.currentLanguage = this.i18nService.language;
    console.log("ORIGINAL LANG: ", this.currentLanguage)
    this.setCountryFlag(this.currentLanguage);


    console.log("Path");
    console.log(this.selectedAdmin);
    console.log(this.plantName);
    console.log("Path");

    console.log('type report')
    console.log(this.typeReport)

    this.adminList= [
      {
       "name": "tool", 
       "description": "Tools",
       "cls": "fab fa-apple"
      },
      {
        "name": "team", 
        "description": "Teams",
        "cls": "far fa-calendar-check"
      },
      {
        "name": "user", 
        "description": "Users",
        "cls": "fas fa-address-book"

      },
      {
        "name": "qualitygate", 
        "description": "Quality Gate",
        "cls": "fas fa-address-book",
        "submenus": [
          {
            "name": "createview",
            "description": "Create View",
            "cls": "fas fa-plus-circle"
          },
          {
            "name": "viewslist",
            "description": "Edit View",
            "cls": "far fa-edit"
          },
          {
            "name": "createoperator",
            "description": "Create Operator",
            "cls": "fas fa-user-cog"
          },
          {
            "name": "trainoperator",
            "description": "Train Operator",
            "cls": "fas fa-chalkboard-teacher"
          },
          {
            "name": "createdefects",
            "description": "Create Family/Defect",
            "cls": "fas fa-cogs"
          },
          {
            "name": "createitems",
            "description": "Create Item",
            "cls": "fas fa-object-group"
          },
          {
            "name": "ipassignment",
            "description": "Station/MiniCPU IP Assignment",
            "cls": "fab fa-connectdevelop"
          }
        ],
      }
    
    ];

  }

  ngOnInit() {
  }

  
  ngOnDestroy(){
  }

  setLanguage(language: string) {
    console.log(language);
    this.i18nService.language = language;
    this.currentLanguage = this.i18nService.language;
    this.setCountryFlag(language); 

 }

 setCountryFlag(language: string){
   switch(language){
     case 'en-US':
        this.countryFlag = 'assets/images/home/lang-eu.png';
        break;
     case 'es-MX':
        this.countryFlag = 'assets/images/home/lang-mx.png';
        break;
     default:
        this.countryFlag = 'assets/images/home/lang-eu.png';
        break;
   }
 }
 
 get gCurrentLanguage(): string {
  return this.currentLanguage;
}

get languages(): string[] {
  return this.i18nService.supportedLanguages;
}

lastChoice(){
  this.pasoVar = localStorage.getItem('varPaso');
  this.openLinkOverview(this.pasoVar);
}


  openLinkOverview(typeadmin:string){
    localStorage.setItem('varPaso', typeadmin);
    console.log(`admin/${typeadmin}/${this.plantName}`);
    if(typeadmin.includes('user') || typeadmin.includes('qualitygate')){
      this.router.navigate([`admin/${typeadmin}`]);
    }
    else{
      if(this.plantName!=null)
      {
        this.router.navigate([`admin/${typeadmin}/${this.plantName}`]);
      }else{
        this.router.navigate([`admin/${typeadmin}/apodaca`]);
      }
        
    }
    

  }

  addWrap(variable:any){
    this.wrap = variable
  }

  receiveTypeReport(event:any){
    this.typeReport = event;
  }

  receiveIdView(event:any){
    this.idView = event;
    this.router.navigate([`admin/${this.selectedAdmin}/${this.typeReport}/${this.plantName}/${this.idView}`]);
  }

  openSubMenu(menu:any){
    this.router.navigate([`admin/${this.selectedAdmin}/${this.typeReport}/${this.plantName}`]);
  }

}
