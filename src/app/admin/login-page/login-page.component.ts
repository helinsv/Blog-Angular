import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/servises/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  message: string;
  //user: User[];
  constructor(public authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please log in to admin panel';
      } else if (params['authFailed']) {
        this.message = 'Please log in to admin panel again';
      }
    })

    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
    //console.log(user);
  }


}
