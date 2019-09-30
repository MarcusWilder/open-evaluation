import { Observable, Subject } from 'rxjs';

export class PicklistDropdownRef {

  private selection$ = new Subject<number>();

  constructor (
    public options: object[],
    public areSelected: boolean[]
  ) {}

  receiveSelection(): Observable<number> {
    return this.selection$.asObservable();
  }

  sendSelection(ind: number)  {
    this.selection$.next(ind);
  }
}
