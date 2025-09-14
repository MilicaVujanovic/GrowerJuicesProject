import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import {
  USER_DELETE_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
  USER_UPDATE_URL,
  USERS_URL,
} from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { CartService } from './cart.service';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>( //BehaviorSubject cuva poslednju vrijednost i emituje je. (BS) omogucava cuvanje stanja koje treba da bude uvijek dostupno u ovom slucaju user
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient, //za komunikaciju sa backendom
    private toastrService: ToastrService,
    private cartService: CartService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    //console.log(this.userSubject.value);
    console.log('Current user from UserService:', this.userSubject.value);
    return this.userSubject.value;
  }
  //userSubject je nas trenutni korisnik i emituje odredjene promjenen
  //this.userSubject.value je onaj trenutni korisnik i njegovi podaci(uzeti sa backenda)


  //userObservable prati promjene korisnika
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          console.log('users token:', user.token);
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome ${user.name}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  isAdmin(): boolean {
    const user = this.currentUser;
    console.log('Checking if current user is admin:', user); // Dodaj ispis za provjeru
    return user && user.isAdmin;
  }

  register(userRegiser: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe( //pipe() funkcija omogucava da se primjeni vise funckija ili naredbi nad istim podacima
      tap({ //tap() obicna funkcija za debagovanje i console.log prikaz
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome ${user.name}`,
            'Register Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.cartService.clearCart();
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  /*
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
    */
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        console.log('User fetched from localStorage:', user);

        // Provjeri da li korisnik ima token i admin prava
        if (
          user.token &&
          typeof user.isAdmin === 'boolean' &&
          user.name &&
          user.id
        ) {
          return user;
        } else {
          console.warn('User data is missing important fields:', user);
          localStorage.removeItem(USER_KEY);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem(USER_KEY);
      }
    }
    return new User();
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${USER_UPDATE_URL}/${userId}`, user);
  }
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${USER_DELETE_URL}/${userId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL);
  }

  getUser(id: string): Observable<User> {
    const url = `${USERS_URL}/${id}`;
    console.log(`Fetching user data from ${url}`);
    return this.http.get<User>(url);
  }
  editUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${USERS_URL}/${userId}`, userData);
  }
}
