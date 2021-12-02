import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'casestudiesfilter'
})
export class CasestudiesfilterPipe implements PipeTransform {

  transform(miniCaseStudies:any, searchText:any):any {
    if(!miniCaseStudies || !searchText){
      return miniCaseStudies;
    }
    return miniCaseStudies.filter((cardDetail: { ProjectName: string; }) => cardDetail.ProjectName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
  }

}
