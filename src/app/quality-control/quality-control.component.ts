import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.component.html',
  styleUrls: ['./quality-control.component.scss']
})
export class QualityControlComponent implements OnInit {

  public songs;
  public loading = true;
  public songsLoading = false;
  public displayedColumns = ['id', 'title', 'description', 'url', 'rating'];
  private timers = {};
  private lastSongID;
  public genres = [];
  public genre;

  constructor(
    private appService: AppService) { }

  ngOnInit() {
    this.appService.getQueries().subscribe(queries => {
      console.log(queries);
      this.genres = queries;
      this.loading = false;
    });
  }

  getSongs() {
    this.songsLoading = true;
    timer(500).subscribe(() => {
      this.appService.getSongs(this.genre).subscribe((songs) => {
        this.songs = songs;
        this.songsLoading = false;
      });
    });
  }

  updateSong(song) {
    if (this.timers[song.id] != null) {
      this.timers[song.id].unsubscribe();
    }
    this.lastSongID = song.id;
    this.timers[song.id] = timer(1500).subscribe(() => {
      this.appService.updateSong(song, this.genre).subscribe(() => {
        delete this.timers[song.id];
      });
    });
  }

}
