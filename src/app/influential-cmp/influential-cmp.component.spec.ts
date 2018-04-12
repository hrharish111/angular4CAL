import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluentialCmpComponent } from './influential-cmp.component';

describe('InfluentialCmpComponent', () => {
  let component: InfluentialCmpComponent;
  let fixture: ComponentFixture<InfluentialCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluentialCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluentialCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
