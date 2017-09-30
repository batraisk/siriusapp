import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/retry';
import { User } from '../models/user'

const BASE_URL = 'api/users'
@Injectable()
export class AuthService {

  public currentUser: User;

  constructor(private http: HttpClient) { }

  public signUp(user: User): Observable<User> {
    return Observable.create((observer: Observer<User>) => {
      this.http
        .post<User>(`${BASE_URL}`, user)
        .subscribe(
          data => {
            let user = new User(data, true);

            this.setCookie('auth_email', user.email)
            this.setCookie('auth_password', user.password)
            this.currentUser = user;
            observer.next(this.currentUser);
            observer.complete();
          },
          error => observer.error(error)
        );
    })
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }

  private deleteCookie(name) {
      this.setCookie(name, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number = 365, path: string = '') {
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      let cpath:string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }


}
