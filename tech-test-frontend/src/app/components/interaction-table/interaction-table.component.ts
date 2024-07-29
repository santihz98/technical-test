import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interaction } from '../../interface/interaction';
import { InteractionService } from '../../services/interaction.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-interaction-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interaction-table.component.html',
  styleUrl: './interaction-table.component.css',
})
export class InteractionTableComponent implements OnInit {
  interationQuestion: Interaction[] = [];

  constructor(
    private interactionService: InteractionService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchInteractions();
    this.apiService.refresh$.subscribe(() => {
      this.fetchInteractions();
    });
  }

  fetchInteractions() {
    this.interactionService.getInteractions().subscribe(
      (data: any) => {
        const body = JSON.parse(data.body);
        this.interationQuestion = body;
      },
      (error) => {
        console.error('Error fetching interactions', error);
      }
    );
  }
}
