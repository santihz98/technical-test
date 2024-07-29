import boto3
import json
from decimal import Decimal
import uuid

def lambda_handler(event, context):
    sagemaker_runtime = boto3.client('runtime.sagemaker')
    dynamodb = boto3.resource('dynamodb')
    table_name = 'tech-test-sanagude-table'
    table = dynamodb.Table(table_name)

    endpoint_name = 'tech-test-sanagude-endpoint'

    input_payload = json.dumps({
        'question': event['question'],
        'context': event['context']
    })

    response = sagemaker_runtime.invoke_endpoint(
        EndpointName=endpoint_name,
        ContentType='application/json',
        Body=input_payload
    )

    result = json.loads(response['Body'].read().decode())

    interaction_id = str(uuid.uuid4())

    interaction = {
        'InteractionId': interaction_id,
        'question': event['question'],
        'context': event['context'],
        'answer': result['answer'],
        'score': Decimal(str(result['score'])),
        'start': result['start'],
        'end': result['end']
    }

    table.put_item(Item=interaction)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'answer': result['answer'],
            'score': result['score'],
            'start': result['start'],
            'end': result['end']
        })
    }
