import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-seacrh',
  templateUrl: './seacrh.component.html',
  styleUrl: './seacrh.component.css'
})
export class SeacrhComponent implements OnInit {
  searchTerm = '';
  //dohvatljivo kroz klasu, a ako ne stavimo private acessible only throw the constructor
  constructor(activatedRoute:ActivatedRoute, private router: Router ) {
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm) this.searchTerm;
    });
  } 


  ngOnInit(): void {
      
  }

  search(term: string):void {
    if(term)
      this.router.navigateByUrl('/search/' + term);
    }

}
