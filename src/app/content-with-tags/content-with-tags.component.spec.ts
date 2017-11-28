import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWithTagsComponent } from './content-with-tags.component';

describe('ContentWithTagsComponent', () => {
  let component: ContentWithTagsComponent;
  let fixture: ComponentFixture<ContentWithTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentWithTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWithTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
