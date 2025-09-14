import { Injectable } from '@angular/core';
import { Juice } from '../shared/models/Juice';
import { sample_juices, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ADD_JUICE_URL, DELETE_JUICE_ID_URL, JUICE_BY_ID_URL, JUICE_BY_SEARCH_URL, JUICE_BY_TAG_URL, JUICE_TAGS_URL, JUICE_URL, UPDATE_JUICE_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class JuiceService {
  constructor( private http: HttpClient) {}

  getAll(): Observable<Juice[]> {
    return this.http.get<Juice[]>(JUICE_URL);
  } 

  //method to get all juices or juice by search
  //.lowerCase (Pizza pizaa)
  getAllJuicesBySearchTerm(searchTerm: string) {
    return this.http.get<Juice[]>(JUICE_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get <Tag[]> (JUICE_TAGS_URL);
  }

  getAllJuicesByTag(tag: string): Observable<Juice[]> {
    return tag === 'All'?
       this.getAll()
      : this.http.get <Juice[]>(JUICE_BY_TAG_URL + tag);
  }

  getJuiceById(juiceId:string): Observable<Juice>{
    return this.http.get<Juice>(JUICE_BY_ID_URL + juiceId);
    //ako je lijevi dio undefined onda vrati new Juice objekat

  }


  addJuice(juice: Juice):Observable<{juice: Juice}>{
    return this.http.post<{juice:Juice}>(ADD_JUICE_URL, juice);
  }
  updateJuice(juice: Juice): Observable<{ juice: Juice }> {
    const url = `${UPDATE_JUICE_ID_URL}/${juice.id}`;
    return this.http.put<{ juice: Juice }>(url, juice);
  }

  deleteJuice(juiceId: string): Observable<void> {
    const url = `${DELETE_JUICE_ID_URL}/${juiceId}`;
    return this.http.delete<void>(url);
  }

  
}
