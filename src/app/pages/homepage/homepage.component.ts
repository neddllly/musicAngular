import { Component, OnInit } from '@angular/core';
import { Genres, Songs } from '../../const/core.ts/songs';
import { NgFor } from '@angular/common';
import { HttpService } from '../../utils/http.service';
 
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.less'
})
export class HomepageComponent implements OnInit{    
  constructor(private http: HttpService
 
    ){}
  songs=Songs;
  genres=Genres;
  ApiArtists: Array<any> = [];
  ApiSongs: Array<any> = [];
  token = '';
  clientId = 'b5c5d742ae834601a4a6b336ca7c016a';
  clientSecret = 'ad5bd0b0d49b47b3a027d4abde18d9bf';
  ngOnInit(): void {
    this.getToken();

   

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
      this.getArtists();
      this.getArtistsTwo();
      
    });
  }

  getArtists() {
    let headers = {
      Authorization : "Bearer " + this.token,
    };

    let url: string = 'https://api.spotify.com/v1/artists?ids=2YZyLoL8N0Wb9xBt1NhZWg%2C7tYKF4w9nC0nq9CsPZTHyP%2C5pKCCKE2ajJHZ9KAiaK11H%2C74KM79TiuVKeVCqs8QtB0B%2C66CXWjxzNUsdJxJ2JdwvnR%2C4V8LLVI7PbaPR0K2TGSxFF%2C6qqNVTkY8uBg9cP3Jd7DAH%2C5K4W6rqBFWDnAN6FQUkS6x%2C3TVXtAsR1Inumwj472S9r4%2C00FQb4jTyendYWaN8pK0wa';
    this.http.get(url, headers).subscribe((res: any) => {
      this.ApiArtists = res.artists;
      console.log(res);
    });
  }
  getArtistsTwo() {
    let headers = {
      Authorization : "Bearer " + this.token,
    };

    let url: string = 'https://api.spotify.com/v1/artists?ids=73sIBHcqh3Z3NyqHKZ7FOL%2C6vWDO969PvNqNYHIOW5v0m%2C5cj0lLjcoR7YOSnhnX0Po5%2C1McMsnEElThX1knmY4oliG%2C2uYWxilOVlUdk4oV9DvwqK';
    this.http.get(url, headers).subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.artists.length; i++) {
        this.ApiArtists.push(res.artists[i]);
    }
    this.getSongs();
    });
  }


  getSongs() {
    let headers = {
      Authorization: "Bearer " + this.token,
    };
  
    this.ApiArtists.forEach(artist => {
      let id = artist.id;
      let url: string = `https://api.spotify.com/v1/artists/${id}/top-tracks`;
  
      this.http.get(url,  headers ).subscribe((res: any) => {
        this.ApiSongs = this.ApiSongs.concat(res.tracks); // Предполагается, что вы хотите добавить треки к ApiSongs
        
      });
    });
    console.log(this.ApiSongs);
  }
  
  
}
