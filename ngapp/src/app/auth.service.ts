import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get('api/getData')
  }
  registerUser(user: { name: string; email: string; password: string; confirmPassword: string; }){
    return this.http.post(this._registerUrl,user)
  }
  loginUser(user: { email: string; password: string; }){

    return this.http.post(this._loginUrl,user)
  }
}
