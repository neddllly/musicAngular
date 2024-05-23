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
export class ArtistsListComponent implements OnInit {
  constructor(private http: HttpService) {}
  artists = Artists;
  ApiArtists: Array<any> = [];
  token = '';
  clientId = 'b5c5d742ae834601a4a6b336ca7c016a';
  clientSecret = 'ad5bd0b0d49b47b3a027d4abde18d9bf';
  ngOnInit(): void {
    this.getToken();
if( this.token != ''){ this.getArtists();}
   

  }
  getToken() {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
    };

    let body = 'grant_type=client_credentials';

    let url: string = 'https://accounts.spotify.com/api/token';
    this.http.post(url, body, headers).subscribe((res: any) => {
      this.token = res.access_token;
      console.log(this.token);
    });
  }

  getArtists() {
    let headers = {
      Authorization : "Bearer " + this.token,
    };

    let url: string = 'https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa';
    this.http.get(url, headers).subscribe((res: any) => {
      console.log(res);
    });
  }
}
