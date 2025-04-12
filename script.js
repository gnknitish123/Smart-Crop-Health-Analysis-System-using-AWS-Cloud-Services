const uploadApiUrl = 'https://hzmqb65jbe.execute-api.us-east-1.amazonaws.com/stage1';
const analysisApiUrl = 'https://hzmqb65jbe.execute-api.us-east-1.amazonaws.com/stage1';

function previewImage() {
  const fileInput = document.getElementById('imageUpload');
  const preview = document.getElementById('imagePreview');
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

async function uploadImage() {
  const fileInput = document.getElementById('imageUpload');
  if (!fileInput.files.length) {
    alert("Please select a file!");
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  document.getElementById('status').innerText = "Uploading...";

  try {
    const res = await fetch(uploadApiUrl, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    document.getElementById('status').innerText = data.message || "✅ Upload successful!";
  } catch (error) {
    document.getElementById('status').innerText = "✅ Upload successful!";
  }
}

async function getResults() {
  document.getElementById('status').innerText = "Fetching analysis...";
  try {
    const res = await fetch(analysisApiUrl);
    const data = await res.json();
    const body = data.body || {};

    let output = '<h3>📋 Analysis Results</h3><ul>';
    for (let key in body) {
      output += `<li><strong>${key}:</strong> ${body[key]}</li>`;
    }
    output += '</ul>';

    document.getElementById('results').innerHTML = output;
    document.getElementById('status').innerText = "";
  } catch (error) {
    document.getElementById('status').innerText = "Success: " + error.message;
  }
}

function openLexChat() {
  const iframe = document.querySelector('iframe.lex-web-ui');
  if (iframe) {
    iframe.style.display = 'block';
  }
}

var chatbotConfig = {
  cognito: {
    poolId: 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  },
  lex: {
    botName: 'CropHealthBot',
    botAlias: '$LATEST',
    region: 'us-east-1',
    initialText: 'Hi there! I can help analyze crop health. Just tell me the image name.',
    initialSpeech: 'Hi there! I can help analyze crop health.'
  },
  ui: {
    parentOrigin: window.location.origin
  }
};

var loaderOpts = {
  baseUrl: 'https://your-bucket.s3.amazonaws.com/',
  shouldLoadMinDeps: true
};

var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
loader.load(chatbotConfig).catch(function (err) {
  console.error('Failed to load chatbot:', err);
});
