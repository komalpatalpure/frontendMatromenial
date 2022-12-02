import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomemediatorComponent } from './welcomemediator.component';

describe('WelcomemediatorComponent', () => {
  let component: WelcomemediatorComponent;
  let fixture: ComponentFixture<WelcomemediatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomemediatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomemediatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
