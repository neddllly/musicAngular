import { Component, OnInit } from '@angular/core';
import { Genres, Songs } from '../../const/core.ts/songs';
import { NgFor } from '@angular/common';
 
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.less'
})
export class HomepageComponent implements OnInit{    
  constructor(
 
    ){}
  songs=Songs;
  genres=Genres;
  
  ngOnInit(): void {

  }

}
