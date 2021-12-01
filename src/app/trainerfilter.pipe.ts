import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trainerfilter'
})
export class TrainerfilterPipe implements PipeTransform {

  transform(trainerDetails: any, searchValue: any): any {
    if (!trainerDetails || !searchValue) {
      return trainerDetails;
    }
    return trainerDetails.filter((trainer: { trainerName: any; }) => trainer.trainerName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }

}
