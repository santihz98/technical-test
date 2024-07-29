import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionFormComponent } from './question-form.component';
import { ApiServiceMock } from '@services/api.service';
import { InteractionServiceMock } from '@services/interaction.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, QuestionFormComponent],
      providers: [
        { provide: 'ApiService', useValue: ApiServiceMock },
        { provide: 'InteractionService', useValue: InteractionServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
