import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoPage } from './histo.page';

describe('HistoPage', () => {
  let component: HistoPage;
  let fixture: ComponentFixture<HistoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
