import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { NoContentComponent } from './components/no-content/no-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent,
    NoContentComponent
  ],
  exports: [
    LoginComponent,
    NoContentComponent
  ]
})
export class SharedModule { }
