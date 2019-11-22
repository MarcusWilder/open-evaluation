import { Injectable } from '@angular/core';
import { of, Observable, Subject, identity } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flatMap, map, tap, catchError } from 'rxjs/operators';

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
  
  constructor(private http: HttpClient) {}

  get user$(): Observable<User> {
    if (this.user) return of(this.user);
    let subject = new Subject<User>();
    this.subjects.push(subject);
    return subject;
  }

  fetchUserInfo(cookie$) {
    let user; let cookie;
    return cookie$.pipe(
      flatMap((_cookie) => {
        cookie = _cookie
        return this.http.get<User>(`${API_SERVER_URL}/user?cookie=${cookie}`)
      }),
      flatMap(_user => {
        user = _user;
        return this.http.get<Course[]>(`${API_SERVER_URL}/courses?cookie=${cookie}`);
      }),
      map(courses => {
        Object.assign(user, { courses });
        const role = new URLSearchParams(window.location.search).get('role');
        if (role === 'student' || role === 'professor') user.role = role; // OVERRIDE
        console.log('Logged in as', user);
        this.user = user;
        this.subjects.forEach(s => s.next(user));
        return user;
      }),
      catchError((error) => {
        window.localStorage.removeItem('cookie');
        return of(null);
      })
    );
  }

  loginWithCookie(cookie) {
    return this.fetchUserInfo(of(cookie));
  }

  login(username: string, password: string): Observable<User> {
    const cookie$ = this.http.get(
      `${API_SERVER_URL}/cookie?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      { responseType: 'text' }
    ).pipe(
      tap(cookie => window.localStorage.setItem('cookie', cookie))
    );
    return this.fetchUserInfo(cookie$);
  }

  logOut(): void {
    this.user = null;
    window.localStorage.removeItem('cookie');
  }
}
