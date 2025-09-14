import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuicePageComponent } from './juice-page.component';

describe('JuicePageComponent', () => {
  let component: JuicePageComponent;
  let fixture: ComponentFixture<JuicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
