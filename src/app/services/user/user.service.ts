import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flatMap, map } from 'rxjs/operators';

const API_SERVER_URL = `http://localhost:4201`;

export interface Course {
  courseId: number,
  courseName: string
}

export interface User {
  id: number,
  name: string,
  role: 'student' | 'professor',
  courses: Course[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subjects = [];
  user: User;
  private ACCESS_TOKEN: string;
  
  constructor(private http: HttpClient) {}

  get user$(): Observable<User> {
    if (this.user) return of(this.user);
    let subject = new Subject<User>();
    this.subjects.push(subject);
    return subject;
  }

  fetchUser(token: string): Observable<any> {
    this.ACCESS_TOKEN = token;
    let _user;
    return this.http.get<User>(`${API_SERVER_URL}/user?access_token=${token}`).pipe(
      flatMap(__user => {
        _user = __user;
        return this.http.get<Course[]>(`${API_SERVER_URL}/courses?access_token=${token}`);
      }),
      map(courses => {
        const user = Object.assign({}, _user, { courses });
        const role = new URLSearchParams(window.location.search).get('role');
        if (role === 'student' || role === 'professor') user.role = role; // OVERRIDE
        console.log('Logged in as', user);
        this.user = user;
        this.subjects.forEach(s => s.next(user));
      })
    );
  }

  logOut(): void {
    this.ACCESS_TOKEN = '';
    this.user = null;
  }
}
