import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecapComponent } from './account-recap.component';

describe('AccountRecapComponent', () => {
  let component: AccountRecapComponent;
  let fixture: ComponentFixture<AccountRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
