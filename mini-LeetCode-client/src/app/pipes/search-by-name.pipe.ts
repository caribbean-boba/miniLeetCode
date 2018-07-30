import { Pipe, PipeTransform } from '@angular/core';
import {Problem } from '../model/problem_model';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(problems: Problem[], name: string): Problem[]{
    return problems.filter(
      problem => problem.name.toLowerCase().includes(name)
    );
  }

}
