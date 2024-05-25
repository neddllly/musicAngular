import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-songs-list',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.less'
})
export class SongsListComponent implements OnInit{    
  constructor(private http: HttpService, private cdr: ChangeDetectorRef
 
    ){}

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
     
      this.getArtists();
      
      
    });
  }

  getArtists() {
    let headers = {
      Authorization : "Bearer " + this.token,
    };

    let url: string = 'https://api.spotify.com/v1/artists?ids=2YZyLoL8N0Wb9xBt1NhZWg%2C7tYKF4w9nC0nq9CsPZTHyP%2C5pKCCKE2ajJHZ9KAiaK11H%2C74KM79TiuVKeVCqs8QtB0B%2C66CXWjxzNUsdJxJ2JdwvnR%2C4V8LLVI7PbaPR0K2TGSxFF%2C6qqNVTkY8uBg9cP3Jd7DAH%2C5K4W6rqBFWDnAN6FQUkS6x%2C3TVXtAsR1Inumwj472S9r4%2C00FQb4jTyendYWaN8pK0wa';
    this.http.get(url, headers).subscribe((res: any) => {

      this.ApiArtists = res.artists;

      this.getArtistsTwo();
      
    });
  }
  
  getArtistsTwo() {
    let headers = {
      Authorization : "Bearer " + this.token,
    };

    let url: string = 'https://api.spotify.com/v1/artists?ids=73sIBHcqh3Z3NyqHKZ7FOL%2C6vWDO969PvNqNYHIOW5v0m%2C5cj0lLjcoR7YOSnhnX0Po5%2C1McMsnEElThX1knmY4oliG%2C2uYWxilOVlUdk4oV9DvwqK';
    this.http.get(url, headers).subscribe((res: any) => {

      for (let i = 0; i < res.artists.length; i++) {
        this.ApiArtists.push(res.artists[i]);
    }

    this.ApiArtists.forEach((artist: any)=>{
      this.getSongs(artist);
    })
    });
   }

  getSongs(artist) {
  
    let headers = {
      Authorization: "Bearer " + this.token,
    };
    let url: string = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`;
 
      this.http.get(url,  headers ).subscribe((res: any) => {
        artist.songs =  res.tracks;  
        this.cdr.detectChanges()
         this.ApiSongs.push(artist.songs) 
       
      });
  
  }
  
  
}
