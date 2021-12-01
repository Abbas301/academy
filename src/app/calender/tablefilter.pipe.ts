import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablefilter'
})
export class TablefilterPipe implements PipeTransform {

  transform(batches: any, searchValue: any): any {
    if(!batches || !searchValue) {
      return batches;
    }
    return batches.filter((batch: { batchName: string; }) => batch.batchName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }

}
