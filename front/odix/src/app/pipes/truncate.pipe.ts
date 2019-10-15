import { Pipe, PipeTransform, HostListener } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  private screenWidth: number;
  private value: string;
  private mediaquery: any;

  public constructor(){
    this.screenWidth = window.innerWidth;
  }

  /**
   * mediaquieries based in mgx-carousel and bootstrap 4 
  */

  transform(value: string, mediaquery?: any): any {
    
    this.value = value;
    this.mediaquery = mediaquery;

    if(!this.mediaquery){
      return this.value;
    }

    if(this.screenWidth >= 1200){
     return (this.mediaquery.lg < this.value.length) ? (this.value.substring(0, this.mediaquery.lg - 3) + '...') : this.value;    
    }

    if(this.screenWidth >= 992){
     return (this.mediaquery.md < this.value.length) ? (this.value.substring(0, this.mediaquery.md - 3) + '...') : this.value;   
    }

    if(this.screenWidth >= 768){
     return (this.mediaquery.sm < this.value.length) ? (this.value.substring(0, this.mediaquery.sm - 3) + '...') : this.value;   
    }

    if(this.screenWidth >= 576){
       return (this.mediaquery.xs < this.value.length) ? (this.value.substring(0, this.mediaquery.xs - 3) + '...') : this.value; 
    }
 
   return this.value;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }

  
}
