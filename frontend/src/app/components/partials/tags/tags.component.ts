import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { JuiceService } from '../../../services/juice.service';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  tags?: Tag[];

  constructor( juiceService: JuiceService) {
     juiceService.getAllTags().subscribe(serverTags =>{
      this.tags = serverTags;

     }); //VRACAMO SVE TAGOVE IZ SAMPLES_TAGS IZ DATA.TS FILE
    
   }

  ngOnInit(): void {
    
  }


}
