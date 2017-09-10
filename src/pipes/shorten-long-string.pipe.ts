import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortenLongString'})
export class ShortenLongStringPipe implements PipeTransform {
  transform(value: string, length: number): string {

    if(value.length <= length)
      return value;

    return value.substr(0, length).trim() + '...';
  }
}
