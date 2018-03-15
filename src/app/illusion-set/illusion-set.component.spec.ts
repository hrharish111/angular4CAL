import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllusionSetComponent } from './illusion-set.component';

describe('IllusionSetComponent', () => {
  let component: IllusionSetComponent;
  let fixture: ComponentFixture<IllusionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllusionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllusionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
