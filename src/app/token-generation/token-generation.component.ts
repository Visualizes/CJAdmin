import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.component.html',
  styleUrls: ['./token-generation.component.scss']
})
export class TokenGenerationComponent implements OnInit {

  public formGroup: FormGroup;
  public generated = false;
  public url;
  private users;
  public ratings = [
    1, 2, 3, 4, 5
  ];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(private _fb: FormBuilder,
              private appService: AppService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('rating') == null) {
      localStorage.setItem('rating', '3');
    }
    this.appService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });

    this.formGroup = this._fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      genre: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      rating: [Number(localStorage.getItem('rating')), Validators.required]
    })
  }

  generateToken(formDirective) {
    if (this.formGroup.valid) {
      this.appService.generateToken(this.formGroup.value).subscribe((token) => {
        this.snackBar.open('Token generated!', 'Close', {
          duration: 2000
        });
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

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(option => {
      const name = `${option.id} (${option.first_name} ${option.last_name})`;
      return name.toLowerCase().includes(filterValue)
    });
  }

  fillNames(option) {
    this.formGroup.patchValue({
      id: option.id,
      firstName: option.first_name,
      lastName: option.last_name
    })
  }

  cacheRating(rating) {
    localStorage.setItem('rating', rating.toString());
  }

}
