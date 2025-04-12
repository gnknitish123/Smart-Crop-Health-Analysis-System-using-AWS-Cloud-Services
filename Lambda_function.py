import json
import boto3
import base64
import uuid

s3 = boto3.client('s3')
BUCKET_NAME = 'your-bucket-name'  # Replace with your actual S3 bucket


def lambda_handler(event, context):
    http_method = event.get('httpMethod', '')

    if http_method == 'POST':
        # ---------- Handle Image Upload ----------
        try:
            content_type = event['headers'].get('Content-Type', '')
            body = event['body']

            # Decode if base64 encoded (API Gateway should pass isBase64Encoded = true)
            if event.get('isBase64Encoded'):
                file_data = base64.b64decode(body)
            else:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'File must be base64 encoded'})
                }

            # Generate unique file name and upload
            file_name = f"uploads/{str(uuid.uuid4())}.jpg"
            s3.put_object(Bucket=BUCKET_NAME, Key=file_name, Body=file_data, ContentType='image/jpeg')

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': '✅ Upload successful!', 'fileName': file_name})
            }

        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': str(e)})
            }

    elif http_method == 'GET':
        # ---------- Handle Image Analysis (Mock) ----------
        try:
            # This can be replaced with real ML model inference
            analysis_result = {
                'Prediction': 'Leaf Spot Disease',
                'Confidence': '93%',
                'Recommended Action': 'Apply copper-based fungicide, ensure proper irrigation.'
            }

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'body': analysis_result})
            }

        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': str(e)})
            }

    else:
        # ---------- Unsupported Method ----------
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method Not Allowed'})
        }
