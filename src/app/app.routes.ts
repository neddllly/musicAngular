import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArtistsListComponent } from './pages/artists-list/artists-list.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { SongsListComponent } from './pages/songs-list/songs-list.component';
import { SongPageComponent } from './pages/song-page/song-page.component';


export const routes: Routes = [
    { path: '', component: HomepageComponent }, 
    { path: 'artist/:id', component: ArtistPageComponent }, 
    { path: 'artists', component: ArtistsListComponent },
    { path: 'song/:id', component: SongPageComponent}, 
    { path: 'songs', component: SongsListComponent }
    
];

 