# tests/test_lambda_function.py

import json
import lambda_function

def test_lambda_handler(monkeypatch):
    # Simulamos la respuesta de SageMaker
    class MockBoto3Client:
        def invoke_endpoint(self, EndpointName, ContentType, Body):
            return {
                'Body': MockBody()
            }

    class MockBody:
        def read(self):
            return json.dumps({
                'answer': 'Paris',
                'score': 0.9,
                'start': 0,
                'end': 5
            }).encode('utf-8')

    # Mock boto3 client
    monkeypatch.setattr(lambda_function.boto3, 'client', lambda x: MockBoto3Client())

    event = {
        'question': 'What is the capital of France?',
        'context': 'France is a country in Europe.'
    }
    context = {}

    response = lambda_function.lambda_handler(event, context)
    response_body = json.loads(response['body'])

    assert response['statusCode'] == 200
    assert response_body['answer'] == 'Paris'
    assert response_body['score'] == 0.9
    assert response_body['start'] == 0
    assert response_body['end'] == 5
