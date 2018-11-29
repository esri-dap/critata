import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneArcgisComponent } from './scene-arcgis.component';

describe('SceneArcgisComponent', () => {
  let component: SceneArcgisComponent;
  let fixture: ComponentFixture<SceneArcgisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneArcgisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneArcgisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
