import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    // document.cookie = "userName=Vasya";
    // this.auth.signUp(form: NgForm).subscribe(
    // let user = new User(form);
    //   data => console.log(data)

    // )
  }

  public signUp(form: NgForm): void {
    // let user = new User(form.value);
    this._auth.signUp(form.value as User).subscribe();
  }

}
