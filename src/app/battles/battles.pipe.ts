import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'battlesPipe',
  pure: false
  
})
export class BattlesPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => item.isFinish === filter.isFinish);
}
}