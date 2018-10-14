import {RouterModule, Routes} from '@angular/router';
import {QualityControlComponent} from './quality-control/quality-control.component';
import {AddSoundcloudSongsComponent} from './add-soundcloud-songs/add-soundcloud-songs.component';
import {TokenGenerationComponent} from './token-generation/token-generation.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: '/admin/songs',
        pathMatch: 'full'
      },
      {
        path: 'songs',
        component: AddSoundcloudSongsComponent
      },
      {
        path: 'quality',
        component: QualityControlComponent
      },
      {
        path: 'token',
        component: TokenGenerationComponent
      }
    ]
  }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
