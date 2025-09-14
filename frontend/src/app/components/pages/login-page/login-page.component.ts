import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder: FormBuilder,
     private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    }); //loginForma kreira react formu sa login i password

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    //vratice adresu gdje treba da idemo nakon uspjesnog logina-a
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value,
       password: this.fc.password.value}).subscribe(() => {
         this.router.navigateByUrl(this.returnUrl);
       });
       //subscribe funkcija je ta koja se poziva kada Observable emituje podatke(rezultati http zahtjeva sa backenda)
       //subscribe omoguava da reagujemo na promjene podataka i da manipulisemo tim podacima sa backenda


  }

}