import { Pipe, PipeTransform } from '@angular/core';
import {LavoroIntervalli} from '../lavoro/LavoroIntervalli';

@Pipe({
  name: 'getValues'
})
export class GetValuesPipe implements PipeTransform {

  transform(map: Map<string, LavoroIntervalli[]>): any[] {
    if (!map) {
      return;
    }
    const ret = [];

    /*
    Object.keys(map).forEach(key => {
      ret.push({key, map.get(key)});
    });
*/
    return ret;
  }

}
