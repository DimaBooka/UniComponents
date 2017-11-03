import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.usersService.login(this.loginForm.value).subscribe(resp => {
      this.router.navigate(['games']);
    });
  }
}
