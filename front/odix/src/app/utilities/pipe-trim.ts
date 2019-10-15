import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removewhite'
})
export class RemoveWhitePipe implements PipeTransform{
  transform(value: string, args?: any): string {
    return value.replace(/ /g, '');
  }
 
}