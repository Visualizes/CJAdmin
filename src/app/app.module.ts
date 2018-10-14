import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QualityControlComponent } from './quality-control/quality-control.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routing} from './app.routing';
import { AddSoundcloudSongsComponent } from './add-soundcloud-songs/add-soundcloud-songs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {AppService} from './app.service';
import {HttpClientModule} from '@angular/common/http';
import { TokenGenerationComponent } from './token-generation/token-generation.component';

@NgModule({
  declarations: [
    AppComponent,
    QualityControlComponent,
    AddSoundcloudSongsComponent,
    TokenGenerationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    Routing
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
