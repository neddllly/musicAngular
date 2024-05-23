import { Component, OnInit } from '@angular/core';
import { Artists } from '../../const/core.ts/songs';
import { NgFor } from '@angular/common';
import { HttpService } from '../../utils/http.service';


@Component({
  selector: 'app-artists-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './artists-list.component.html',
  styleUrl: './artists-list.component.less',
  
})
export class ArtistsListComponent implements OnInit{    
  constructor(
    private http: HttpService,
    ){}
  artists=Artists;
  data: Array<any> = [];
        clientId="b5c5d742ae834601a4a6b336ca7c016a" ;
      clientSecret= "ad5bd0b0d49b47b3a027d4abde18d9bf";
  ngOnInit(): void {
this.getToken()
  }
  getToken() {
    let headers = {
      "Content-Type" : "application/x-www-form-urlencoded",
      "Authorization": "Basic " +  btoa(this.clientId + ":" + this.clientSecret) ,
    };

    let body = "grant_type=client_credentials" 
    
    let url: string = 'https://accounts.spotify.com/api/token';
    this.http.post(url, body, headers).subscribe((res: any) => {
      this.data=res.access_token ;
      console.log(this.data)
    });
   
  }

}
