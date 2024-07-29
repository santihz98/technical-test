import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { InteractionService } from './interaction.service';

describe('InteractionService', () => {
  let service: InteractionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractionService, provideHttpClientTesting()],
    });
    service = TestBed.inject(InteractionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch interactions', () => {
    const dummyInteractions = [
      {
        InteractionId: '1',
        question: 'What is the capital of France?',
        context: 'Geography context',
        answer: 'Paris',
      },
    ];

    service.getInteractions().subscribe((interactions) => {
      expect(interactions.body).toEqual(JSON.stringify(dummyInteractions));
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ body: JSON.stringify(dummyInteractions) });
  });
});
