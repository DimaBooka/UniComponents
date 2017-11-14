import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.usersService.isLogged.next(false);
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.usersService.login(this.loginForm.value).subscribe(resp => {
      this.router.navigate(['games']);
    });
  }
}
