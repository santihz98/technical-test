import boto3
import json
from decimal import Decimal

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'tech-test-sanagude-table'
    table = dynamodb.Table(table_name)

    response = table.scan()

    items = response['Items']

    def decimal_default(obj):
        if isinstance(obj, Decimal):
            return float(obj)
        raise TypeError

    return {
        'statusCode': 200,
        'body': json.dumps(items, default=decimal_default)
    }