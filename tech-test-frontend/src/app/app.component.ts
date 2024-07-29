import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { InteractionTableComponent } from './components/interaction-table/interaction-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionFormComponent, InteractionTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tech-test-frontend';
}
