import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversitySampleComponent } from './diversity-sample.component';

describe('DiversitySampleComponent', () => {
  let component: DiversitySampleComponent;
  let fixture: ComponentFixture<DiversitySampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiversitySampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiversitySampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
