import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent {
  @Output() newInteraction = new EventEmitter<any>();
  addQuestion: FormGroup;
  loading = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private interactionService: InteractionService
  ) {
    this.addQuestion = this.fb.group({
      question: ['', Validators.required],
      context: ['', Validators.required],
    });

    this.apiService.refresh$.subscribe(() => {
      this.interactionService.getInteractions().subscribe();
    });
  }

  onSubmit() {
    if (this.addQuestion.valid) {
      this.loading = true;
      const { question, context } = this.addQuestion.value;
      this.apiService.askQuestion(question, context).subscribe(
        (response) => {
          console.log('Question asked successfully', response);
          this.newInteraction.emit(response);
          this.interactionService.getInteractions().subscribe();
          this.loading = false;
        },
        (error) => {
          console.error('Error asking question', error);
          this.loading = false;
        }
      );
    }
  }
}
