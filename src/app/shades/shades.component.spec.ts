import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadesComponent } from './shades.component';

describe('ShadesComponent', () => {
  let component: ShadesComponent;
  let fixture: ComponentFixture<ShadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
