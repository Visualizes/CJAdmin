import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoundcloudSongsComponent } from './add-soundcloud-songs.component';

describe('AddSoundcloudSongsComponent', () => {
  let component: AddSoundcloudSongsComponent;
  let fixture: ComponentFixture<AddSoundcloudSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoundcloudSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoundcloudSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
