import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as env from '../../../secrets/env.json';

@Component({
  selector: 'app-add-soundcloud-songs',
  templateUrl: './add-soundcloud-songs.component.html',
  styleUrls: ['./add-soundcloud-songs.component.scss']
})
export class AddSoundcloudSongsComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private appService: AppService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this._fb.group({
      apiKey: [(<any>env).SOUNDCLOUD_API_KEY, Validators.required],
      limit: ['', Validators.required],
      offset: ['', Validators.required],
      query: ['', Validators.required],
      license: ['cc-by', Validators.required]
    })
  }

  addSongs() {
    this.appService.addSongs(this.formGroup.value).subscribe();
  }
}
