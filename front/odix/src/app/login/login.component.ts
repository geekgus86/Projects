import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { forEach } from '@angular/router/src/utils/collection';


const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() {
    $('body').removeClass('parallax');
    $('odix-header').hide();
  }

  ngOnDestroy() {
    $('body').addClass('parallax');
    $('odix-header').show();
  }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.user} successfully logged in`);
        this.authenticationService.setCredentials({username: credentials.user, token: credentials.token});
        if(credentials && credentials.token != null){
          let attRoute = sessionStorage.getItem('attemptedRoute');
          if(attRoute){
            sessionStorage.removeItem('attemptedRoute');
            if(window.location.hostname != "localhost")
            {
              window.location.href =   "/odix" + attRoute;
            }else
            {
              window.location.href =  attRoute;
            }
          }else{
            window.location.href = "/odix";
          }
          
        }else{
          alert('Invalid username or password');
        }
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}

// $('#video-background').bind('play', function (e) {
//   // do something
// });

function videoPlays(){
  $('#video-background').trigger('play');
}

$('.login-container').click(videoPlays);
$('.login-box').click(function(){
  //console.log('1212');
});

setTimeout(function () {
  $('#d-block1').show().addClass('fadeInLeft');}, 500
);


// function slider(){

//   var srcNumber = ['2.png" >', '3.png" >', '4.png" >'];
//   var imagen = '<img _ngcontent-c5 class="login-bg animated fadeIn" src="assets/images/home/bg-';

//   setTimeout(() => {
//     console.log(imagen + srcNumber[1]);
//       $('.bg-images').append(imagen + srcNumber[1]);
//     }, 9000);

//   setTimeout(() => {
//     console.log(imagen + srcNumber[1]);
//       $('.bg-images').append(imagen + srcNumber[2]);
//     }, 18000);

//   setTimeout(() => {
//     console.log(imagen + srcNumber[1]);
//       $('.bg-images').append(imagen + srcNumber[0]);
//     }, 27000);

// }

// slider();

// setInterval(slider,27000);


var srcNumber = ['2.png" >', '3.png" >', '4.png" >'];
var imagen = '<img _ngcontent-c5 class="login-bg animated fadeIn" src="assets/images/home/bg-';

function slider2(){
srcNumber.forEach(function(element, i) {
    setTimeout(() => {
      console.log(imagen + element);
        $('.bg-images').append(imagen + element);
    }, 9000 * i );
  });
}

slider2();
setInterval(slider2,27000);