import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({name: 'trim'})
export class TextTrimPipe implements PipeTransform {
  public transform(value: string): string {
    return value ? value.trim() : '';
  }
}
