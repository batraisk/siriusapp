import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  public currentUser: User;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getUser().subscribe(
      user => {
        if (!user) { return null; }
        this.currentUser = user;
      },
      error => console.log(error)
    );
  }
  public signin(form: NgForm): void {
    this._authService.signIn(form.value as User).subscribe(
      user => this.currentUser = user,
      error => console.log(error)
    );
  }

  public isAutarizate(email, password): void {
    this._authService.getUser().subscribe();
  }

}
