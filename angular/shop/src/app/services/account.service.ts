import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../login/User2';
import { UserService } from './user.service';



@Injectable({ providedIn: 'root' })
export class AccountService {

    public users:User[] 
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
        private userService:UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }
    path = "http://localhost:3000/"

    public get currentUserValue(): User {
        
        return this.currentUserSubject.value;
    }

    login(username, password) :Observable<User[]>{

    // this.users = this.userService.getAll().pipe().subscribe()

   
      
      let newPath=this.path + "/users/authenticate"
      
        return this.http.post<any>(newPath, { username, password })
            .pipe(map(user => {
               
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                
                return user;
            }));
            
    }

    logout() {
        
        
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        
        this.currentUserSubject.next(null);
        
    }
}