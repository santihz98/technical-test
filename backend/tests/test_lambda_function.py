import json
from lambda_function import lambda_handler

def test_lambda_handler():
    event = {
        'question': 'What is the capital of France?',
        'context': 'France is a country in Europe.'
    }
    context = {}
    response = lambda_handler(event, context)
    assert response['statusCode'] == 200
    body = json.loads(response['body'])
    assert 'answer' in body
    assert 'score' in body
    assert 'start' in body
    assert 'end' in body