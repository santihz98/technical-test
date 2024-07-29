export interface Interaction {
  InteractionId: string;
  question: string;
  context: string;
  score: number;
  end: number;
  start: number;
  answer: string;
}
