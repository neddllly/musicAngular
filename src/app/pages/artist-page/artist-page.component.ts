import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { HttpService } from '../../utils/http.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [RouterModule, NgFor, DatePipe, NgIf],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.less',
})
export class ArtistPageComponent implements OnInit {
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  id: number;
  token = '';
  clientId = 'b5c5d742ae834601a4a6b336ca7c016a';
  clientSecret = 'ad5bd0b0d49b47b3a027d4abde18d9bf';
  ApiArtists: any = {};
  ApiSongs: Array<any> = [];
  ApiOneSong: any  

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
      this.getArtists();
    });
  }

  getArtists() {
    let headers = {
      Authorization: 'Bearer ' + this.token,
    };

    let url: string = `https://api.spotify.com/v1/artists/${this.id}`;
    this.http.get(url, headers).subscribe((res: any) => {
      this.ApiArtists = res;
      this.cdr.detectChanges();
      console.log(this.ApiArtists);
      this.getSongs();
    });
  }

  getSongs() {
    let headers = {
      Authorization: 'Bearer ' + this.token,
    };
    let url: string = `https://api.spotify.com/v1/artists/${this.id}/top-tracks`;

    this.http.get(url, headers).subscribe((res: any) => {
      this.ApiSongs = res.tracks;
      this.cdr.detectChanges();
      console.log(this.ApiSongs);
    });
  }
  getOneSong(id) {
    console.log(id);

    let headers = {
      Authorization: 'Bearer ' + this.token,
    };
    let url: string = `https://api.spotify.com/v1/tracks/${id}`;

    this.http.get(url, headers).subscribe((res: any) => {
      this.ApiOneSong = res ;
       
      console.log(this.ApiOneSong);
    });
  }
}
