import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { MenuService } from '@app/core/shell/menu/menu.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({

  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() activeSidebar: boolean
  completeMenu: any;
  suggestion = "";
  nameBrowser = "";

  constructor(private scrollbarService: MalihuScrollbarService,private route: ActivatedRoute, private menuService: MenuService, private router: Router) { 
      console.log("================ MENU COMPONENT =================");
      this.suggestion = "";
    }

    getMenu(): void {
        this.menuService.getMenu()
        .subscribe(res => {
          this.completeMenu = res;
        });
    }

  ngOnInit() {
      this.getMenu();
      $('#messagesForm').on('click', function () {
         $('.send-a-message__form-container').toggleClass('show-messages');
         $('.send-a-message__icon').toggleClass('messages-active');
         $('.download-mobile__container').removeClass('download-mobile__container--active');
         $('#downloadForm').removeClass('download-active');
      });

      $('#downloadForm').on('click', function () {
        $('.download-mobile__container').toggleClass('download-mobile__container--active');
        $('#downloadForm').toggleClass('download-active');
        $('.send-a-message__form-container').removeClass('show-messages');
        $('.send-a-message__icon').removeClass('messages-active');
      });

      $('#downloadAndroid').on( 'click',  function(){
              $('#qr-image').attr('src','assets/images/shell/qr_code_android.png');
              $('#downloadIos').removeClass('os-active');
              $('#downloadAndroid').addClass('os-active');
      });


      $('#downloadIos').on('click', function(){
           $('#qr-image').attr('src','assets/images/shell/qr_code_ios.png');
           $('#downloadAndroid').removeClass('os-active');
           $('#downloadIos').addClass('os-active');
       });

      $('#sendComment').on('click', function () {
          $(".send-a-message__pop-up").addClass('pop-up-shown');
          setTimeout(
              function()
              {
                  $(".send-a-message__pop-up").removeClass('pop-up-shown');
                  $('.send-a-message__form-container').toggleClass('show-messages');
                  $('.send-a-message__icon').toggleClass('messages-active');
              }, 5000);
       });

  }

  ngAfterViewInit() {
    this.scrollbarService.initScrollbar('#sidebar', { axis: 'y', theme: 'minimal', scrollButtons: { enable: true } });
  }

  send()
  {

    this.BrowserDetection();
    this.menuService.sendSuggestion(this.suggestion,this.nameBrowser).subscribe(data => {
     if (data)
     {
        this.suggestion = "";
     }

    });


  }

    BrowserDetection() {
        var userAgent = window.navigator.userAgent;
        //Edge
        let isIEOrEdge = /msie\s|trident\/|edge\//i.test(userAgent)
        if(isIEOrEdge){
          this.nameBrowser = "Edge"
        }

        //Cromme
        var isIE = userAgent.indexOf("MSIE ");
        if(isIE > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
            this.nameBrowser = "IE"
        }

        //firefox
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            this.nameBrowser = "Firefox"
        }

        //Chrome
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if(isChrome){
            this.nameBrowser = "Chrome"
        }

    }
}
