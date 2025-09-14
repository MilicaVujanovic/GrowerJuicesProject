
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Juice } from '../../../shared/models/Juice';
import { JuiceService } from '../../../services/juice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  juices: Juice[] = [];
  constructor(private juiceService: JuiceService, activatedRoute: ActivatedRoute) {
    let foodsObservalbe:Observable<Juice[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservalbe = this.juiceService.getAllJuicesBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservalbe = this.juiceService.getAllJuicesByTag(params.tag);
      else
        foodsObservalbe = juiceService.getAll();

        foodsObservalbe.subscribe((serverFoods) => {
          this.juices = serverFoods;
        })
    })
  }

  ngOnInit(): void {
  }

}
