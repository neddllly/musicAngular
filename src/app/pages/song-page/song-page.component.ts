import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { ActivatedRoute } from '@angular/router';
import { Lyrics } from '../../const/core.ts/songs';
import { NgFor, NgIf } from '@angular/common';
 

@Component({
  selector: 'app-song-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './song-page.component.html',
  styleUrl: './song-page.component.less'
})
export class SongPageComponent implements OnInit {
  private geniusClient;
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    
  ) {
   }
lyrics = Lyrics
  id: number;
  token = '';
  clientId = 'b5c5d742ae834601a4a6b336ca7c016a';
  clientSecret = 'ad5bd0b0d49b47b3a027d4abde18d9bf';
  ApiArtists: any = {};
  ApiSongs: Array<any> = [];
  ApiOneSong: any  
   songslyr : Array<any> = [];

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.id = params.id;
        this.getToken();
      }
    });
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
      this.getSongs() 
    });
  }

  getSongs() {
    console.log(this.id);
    let headers = {
      Authorization: 'Bearer ' + this.token,
    };
    let url: string = `https://api.spotify.com/v1/tracks/${this.id}`;

    this.http.get(url, headers).subscribe((res: any) => {
      this.ApiOneSong = res;
      this.cdr.detectChanges();
      console.log(this.ApiOneSong);
       
    });
  }

 
}
