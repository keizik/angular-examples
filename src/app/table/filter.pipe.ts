import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './table.component';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Person[], filterValue: string): Person[] {
    return items.filter((item) => item.name.toLowerCase().includes(filterValue.toLowerCase()));
  }
}