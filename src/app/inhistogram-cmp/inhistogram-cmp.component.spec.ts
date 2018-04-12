import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhistogramCmpComponent } from './inhistogram-cmp.component';

describe('InhistogramCmpComponent', () => {
  let component: InhistogramCmpComponent;
  let fixture: ComponentFixture<InhistogramCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhistogramCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhistogramCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
