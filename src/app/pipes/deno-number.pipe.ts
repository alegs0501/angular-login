import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'denoNumber'
})
export class DenoNumberPipe implements PipeTransform {

  transform(value: number) : any {
    const res = []
    for (let i = 1; i <= value; i++) {
        res.push(i)
      }
      return res
  }

}
