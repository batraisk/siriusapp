import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: User;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this._authService.currentUser;
  }

  public signOut(): void {
    this._authService.signOut();
    this.currentUser = this._authService.currentUser;
  }
}
