import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonChecksService {

  constructor() { }

  isNotNull<T>(value: T):boolean{
    return value !== null;
  }

  isNotUndefined<T>(value: T):boolean{
    return value !== undefined;
  }

  isNotNullOrUndefined<T>(value: T) : boolean {
    return this.isNotUndefined(value) && this.isNotNull(value);
  }

  isPopulatedArray<T>(array: T[]) : boolean {
    return (this.isNotNullOrUndefined(array) && Array.isArray(array) && array.length>0);
  }
}
