import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-odix-menu-top',
  templateUrl: './odix-menu-top.component.html',
  styleUrls: ['./odix-menu-top.component.scss']
})
export class OdixMenuTopComponent implements OnInit, AfterViewInit {

  @Input() activeSidebar: boolean
  completeMenu: any;
  suggestion = "";
  nameBrowser = "";

  constructor(private scrollbarService: MalihuScrollbarService,private route: ActivatedRoute) { 
      console.log("======== ODIX TOP MENU COMPONENT =========")
      this.suggestion = "";
      this.completeMenu = this.route.snapshot.data.menu;
     
     
    }

   
  ngOnInit() {

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
           $('#qr-image').attr('src','assets/images/shell/qr-code.png');
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

}
