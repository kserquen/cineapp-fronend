import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDialogoComponent } from './cliente-dialogo.component';

describe('ClienteDialogoComponent', () => {
  let component: ClienteDialogoComponent;
  let fixture: ComponentFixture<ClienteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
