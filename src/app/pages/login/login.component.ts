import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';


const API_URL = 'http://localhost:5220/';

interface ILogin {
  user_id: string,
  user_name: string,
  password: string,
  name: string,
  contact_no: string,
  address: string,
  groups: string,
  by_user: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public email: string = '';
  public password: string = '';
  private loginData: ILogin[] =[];

  constructor(private http: HttpClient) {
    this.http.get(API_URL + 'get_login').subscribe((data: ILogin[]) => {
      data.forEach((loginData: ILogin): void => {
        this.loginData.push(loginData);
      });
      console.log('Login Data', this.loginData);
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  public loginUser(): void {
    const userName: string = this.email.toLowerCase();
    const password: string = this.password.toLowerCase();

    if (userName && password) {
      this.loginData.forEach((data: ILogin, index: number) => {
        if (userName === data.user_name.toLowerCase() && password === data.password.toLowerCase()) {
          console.log('User logged in', data);
        }
      });
    }
  }

}
