import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxMessagesComponent } from './rx-messages.component';

describe('RxMessagesComponent', () => {
  let component: RxMessagesComponent;
  let fixture: ComponentFixture<RxMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
