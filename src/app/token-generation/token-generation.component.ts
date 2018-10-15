import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.component.html',
  styleUrls: ['./token-generation.component.scss']
})
export class TokenGenerationComponent implements OnInit {

  public formGroup: FormGroup;
  public generated = false;
  public url;

  constructor(private _fb: FormBuilder,
              private appService: AppService) { }

  ngOnInit() {
    this.formGroup = this._fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      genre: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      rating: ['', Validators.required]
    })
  }

  generateToken(formDirective) {
    if (this.formGroup.valid) {
      this.appService.generateToken(this.formGroup.value).subscribe((token) => {
        console.log(token);
        this.url = `${document.location.protocol}//${window.location.hostname}:3000?token=${token}`;
        formDirective.resetForm();
        this.formGroup.reset();
        this.generated = true;
      });
    }
  }

  getURL() {
    return `${document.location.protocol}//${window.location.hostname}:3000`;
  }

}
