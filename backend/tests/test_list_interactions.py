import unittest
from unittest.mock import patch, MagicMock
import json
from decimal import Decimal
from list_interactions import lambda_handler

class TestListInteractionsHandler(unittest.TestCase):

    @patch('list_interactions.boto3.resource')
    def test_list_interactions_handler(self, mock_boto3_resource):
        mock_table = MagicMock()
        mock_boto3_resource.return_value.Table.return_value = mock_table

        mock_response = {
            'Items': [
                {
                    'InteractionId': '1',
                    'question': 'What is the capital of France?',
                    'context': 'France is a country in Europe.',
                    'answer': 'Paris',
                    'score': Decimal('0.9'),
                    'start': 0,
                    'end': 5
                }
            ]
        }
        mock_table.scan.return_value = mock_response

        result = lambda_handler(None, None)

        self.assertEqual(result['statusCode'], 200)
        body = json.loads(result['body'])
        self.assertEqual(len(body), 1)
        self.assertEqual(body[0]['InteractionId'], '1')
        self.assertEqual(body[0]['question'], 'What is the capital of France?')
        self.assertEqual(body[0]['context'], 'France is a country in Europe.')
        self.assertEqual(body[0]['answer'], 'Paris')
        self.assertEqual(body[0]['score'], 0.9)
        self.assertEqual(body[0]['start'], 0)
        self.assertEqual(body[0]['end'], 5)

if __name__ == '__main__':
    unittest.main()
