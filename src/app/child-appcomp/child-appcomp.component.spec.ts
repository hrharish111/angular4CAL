import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAppcompComponent } from './child-appcomp.component';

describe('ChildAppcompComponent', () => {
  let component: ChildAppcompComponent;
  let fixture: ComponentFixture<ChildAppcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAppcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAppcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
