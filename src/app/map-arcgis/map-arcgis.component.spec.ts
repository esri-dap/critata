import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapArcgisComponent } from './map-arcgis.component';

describe('MapArcgisComponent', () => {
  let component: MapArcgisComponent;
  let fixture: ComponentFixture<MapArcgisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapArcgisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapArcgisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
