import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VivenciaPage } from './vivencia.page';

describe('VivenciaPage', () => {
  let component: VivenciaPage;
  let fixture: ComponentFixture<VivenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VivenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
