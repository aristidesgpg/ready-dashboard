import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuseBlockComponent } from './fuseblock.component';

describe('FuseBlockComponent', () => {
  let component: FuseBlockComponent;
  let fixture: ComponentFixture<FuseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuseBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
