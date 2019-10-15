import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider-nav',
  templateUrl: './slider-nav.component.html',
  styleUrls: ['./slider-nav.component.scss']
})
export class SliderNavComponent implements OnInit {

  @Input() lines : any;

  constructor() { }

  ngOnInit() {

    this.lines = this.lines.Lines;
      $(".arrow-right").click(function(e) {
        for (let index = 0; index < 108; index++) {
          setTimeout(() => {
            document.getElementById('slider').scrollLeft += 5;
          }, 100);
        }
      });

      $(".arrow-left").click(function(e) {
        for (let index = 0; index < 108; index++) {
          setTimeout(() => {
            document.getElementById('slider').scrollLeft += -5;
          }, 100);
        }
      });

      $('#navArrowDown').click(function(e) {

        if($('#sliderParent').hasClass('fadeInDown')){
          $('#sliderParent').removeClass('fadeInDown'),  $('#sliderParent').addClass('fadeOutUp');
          setTimeout(() => {
            $('#sliderParent').removeClass('fadeOutUp')
          }, 900);
        } else{
          $('#sliderParent').addClass('fadeInDown'), $('#sliderParent').removeClass('fadeOutUp');
        }

        $('#navArrowDown > i').toggleClass('up');

      });

  }
  

}
