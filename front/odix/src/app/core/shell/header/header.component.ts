import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Helper } from '../../../shared/helper';
import { I18nService } from '../../i18n.service';
import { Router } from "@angular/router";
import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() activeSidebar: boolean;
  @Output() ouputActiveSidebar =  new EventEmitter<boolean>();

  currentLanguage : string;
  helper: Helper;
  userName: string;
  token: string;
  countryFlag : string;
  
  constructor(
    private i18nService: I18nService, private authService: AuthenticationService,private router: Router) { 
      this.helper = new Helper();
      this.currentLanguage = this.i18nService.language;
      this.setCountryFlag(this.currentLanguage);
    }

  ngOnInit() { 
    let savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
    let credenciales = savedCredentials && JSON.parse(savedCredentials);
    this.userName = (credenciales && credenciales.username);
    this.token = (credenciales && credenciales.token);
  }

  toggleSidebar(): void {

    this.activeSidebar = !this.activeSidebar;
    this.ouputActiveSidebar.emit(this.activeSidebar);
    $('.send-a-message').toggleClass('send-a-message-closed');
    $('.download-mobile').toggleClass('download-mobile-closed');
    $('.black-options-container-closed').toggleClass('black-options-container');

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/global']);
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
}
