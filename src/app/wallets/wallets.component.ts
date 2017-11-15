import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { toastConfig } from '../shared/toast.config';

@Component({
  selector: 'app-wallets',
  template: `
    <router-outlet></router-outlet>
    <toaster-container [toasterconfig]="toasterconfig"></toaster-container>
  `,
})
export class WalletsComponent {
  public toasterconfig : ToasterConfig = new ToasterConfig(toastConfig);
}
