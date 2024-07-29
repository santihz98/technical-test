import unittest
from unittest.mock import patch, MagicMock
import json
import uuid
from decimal import Decimal
from lambda_function import lambda_handler

class TestLambdaHandler(unittest.TestCase):

    @patch('lambda_function.boto3.client')
    @patch('lambda_function.boto3.resource')
    def test_lambda_handler(self, mock_boto3_resource, mock_boto3_client):
        
        mock_response = {
            'Body': MagicMock(read=MagicMock(return_value=json.dumps({
                'answer': 'Paris',
                'score': 0.9,
                'start': 0,
                'end': 5
            }).encode('utf-8')))
        }

        mock_boto3_client.return_value.invoke_endpoint.return_value = mock_response

        mock_table = MagicMock()
        mock_boto3_resource.return_value.Table.return_value = mock_table

        test_event = {
            'question': 'What is the capital of France?',
            'context': 'France is a country in Europe.'
        }

        result = lambda_handler(test_event, None)

        self.assertEqual(result['statusCode'], 200)
        body = json.loads(result['body'])
        self.assertEqual(body['answer'], 'Paris')
        self.assertEqual(body['score'], 0.9)
        self.assertEqual(body['start'], 0)
        self.assertEqual(body['end'], 5)

        interaction = {
            'InteractionId': unittest.mock.ANY,
            'question': test_event['question'],
            'context': test_event['context'],
            'answer': 'Paris',
            'score': Decimal('0.9'),
            'start': 0,
            'end': 5
        }
        mock_table.put_item.assert_called_with(Item=interaction)

if __name__ == '__main__':
    unittest.main()
