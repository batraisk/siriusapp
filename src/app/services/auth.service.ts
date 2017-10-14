import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/retry';
import { User } from '../models/user';

const BASE_URL = 'api/users';
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
            // tslint:disable-next-line:no-shadowed-variable
            const user = new User(data, true);

            this.setCookie('auth_email', user.email);
            this.setCookie('auth_token', user.encryptedPassword);
            this.currentUser = user;
            console.log(this.currentUser);
            observer.next(this.currentUser);
            observer.complete();
          },
          error => observer.error(error)
        );
    });
  }

  public signIn(user: User): Observable<User> {

    return Observable.create((observer: Observer<User>) => {
      const httpParams = new HttpParams().set('email', user.email).set('password', user.password);
      this.http
        .get<User>(`${BASE_URL}/signin`, { params: httpParams })
        .subscribe(
          data => {
            // tslint:disable-next-line:no-shadowed-variable
            const user = new User(data, true);
            this.setCookie('auth_email', user.email);
            this.setCookie('auth_token', user.encryptedPassword);
            this.currentUser = user;
            console.log(this.currentUser);
            observer.next(this.currentUser);
            observer.complete();
          },
          error => observer.error(error)
        );
    });
  }

  public getUser() {

    return Observable.create((observer: Observer<User>) => {
      this.http
          .get<User>(`${BASE_URL}/authenticate`)
          .subscribe(
            data => {
              console.log(data);
              this.currentUser = new User(data, true);
              observer.next(this.currentUser);
              observer.complete();
            },
            error => observer.error(error)
          );
    });
  }

  public signOut(): void {
    this.deleteCookie('auth_email');
    this.deleteCookie('auth_token');
    this.currentUser = null;
  }

  private getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }

  private deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number = 365, path: string = '') {
      const d: Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      const cpath: string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }


}
