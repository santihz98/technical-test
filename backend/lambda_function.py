import boto3
import json

def lambda_handler(event, context):
    sagemaker_runtime = boto3.client('runtime.sagemaker')
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
    return {
        'statusCode': 200,
        'body': json.dumps({
            'answer': result['answer'],
            'score': result['score'],
            'start': result['start'],
            'end': result['end']
        })
    }