import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { toastConfig } from '../shared/toast.config';

@Component({
  selector: 'app-trans',
  template: `
    <router-outlet></router-outlet>
    <toaster-container [toasterconfig]="toasterconfig"></toaster-container>
  `,
})
export class TransComponent {
  public toasterconfig : ToasterConfig = new ToasterConfig(toastConfig);
}
