# Smart-Crop-Health-Analysis-System-using-AWS-Cloud-Services
This project is a web-based application that empowers farmers and agricultural experts to monitor crop health using AI-powered image analysis. By simply uploading an image of a crop leaf, users receive insights about potential diseases or deficiencies affecting the plant.

🚀 Features
📤 Image Upload: Upload crop leaf images directly from your device.

🧠 AI-Powered Analysis: Automatically detects signs of diseases using machine learning models.

☁️ Built on AWS:

Amazon S3 for secure image storage

AWS Lambda for running serverless processing logic

Amazon API Gateway to expose RESTful endpoints

Amazon Rekognition / Custom Model for disease detection (depending on your setup)

📊 Real-Time Feedback: Displays analysis results in an easy-to-understand format.

💡 Mobile-Friendly UI: Responsive design for use on phones, tablets, or desktops.

🔧 Technologies Used
Frontend: HTML, CSS, JavaScript

Backend: AWS Lambda (Node.js/Python)

APIs: Amazon API Gateway

Storage: Amazon S3

AI/ML: Amazon Rekognition or a custom-trained model on SageMaker

📁 Folder Structure
bash
Copy
Edit
/smart-crop-health/
├── index.html       # Main frontend UI
├── script.js        # Handles image preview, upload, and result display
📷 How It Works
User uploads an image of the crop.

Image is sent to the AWS backend (via API Gateway).

Backend processes the image using a trained AI model.

Results are returned and displayed in the browser.

✅ Future Improvements
Add multi-language support

Integrate with farm dashboards or IoT devices

Store analysis history in DynamoDB
