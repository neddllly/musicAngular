import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArtistsListComponent } from './pages/artists-list/artists-list.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent }, 
    { path: 'artist', component: ArtistPageComponent }, 
    { path: 'artists', component: ArtistsListComponent }
    
];
