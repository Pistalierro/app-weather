import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  resetSignal = signal(false);

  triggerScrollReset() {
    this.resetSignal.set(true);
    setTimeout(() => this.resetSignal.set(false), 0);
  }
}
