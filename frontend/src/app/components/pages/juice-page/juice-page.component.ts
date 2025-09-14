import { Component, OnInit } from '@angular/core';
import { Juice } from '../../../shared/models/Juice';
import { ActivatedRoute, Router } from '@angular/router';
import { JuiceService } from '../../../services/juice.service';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-juice-page',
  templateUrl: './juice-page.component.html',
  styleUrl: './juice-page.component.css',
})
export class JuicePageComponent implements OnInit {
  juice!: Juice;
  constructor(activatedRoute: ActivatedRoute, juiceService: JuiceService,
    private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
         juiceService.getJuiceById(params.id).subscribe(serverJuice => {
        this.juice = serverJuice});
    });
  }

  ngOnInit(): void {}

  addToCart(){
    this.cartService.addToCart(this.juice);
    //trenutni juice ce biti stavljen u korpu
    this.router.navigateByUrl('/cart-page');

  }
}
