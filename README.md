# AWS Party Rock Reverse Engineering

A sleek interface to generate AI images through AWS Party Rock

![GitHub stars](https://img.shields.io/github/stars/Nitishkumar3/AWS-PartyRock-ReverseEngineering?style=social)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/python-3.8+-blue)

## ✨ Features

- Easy-to-use web interface for AWS Party Rock image generation
- Support for multiple image orientations (landscape, portrait, square)
- Custom aspect ratio selection
- Dark/Light mode support
- One-click image downloads

## 📋 Prerequisites

- Python 3.8 or higher
- AWS Party Rock account

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nitishkumar3/AWS-PartyRock-ReverseEngineering.git
cd AWS-PartyRock-ReverseEngineering
```

### 2. Install dependencies

```bash
pip install Flask httpx fake-useragent
```

### 3. Set up cookies

1. Login to [AWS Party Rock](https://partyrock.aws)
2. Install the [Cookie Editor](https://cookie-editor.com/) extension
3. Open the Cookie Editor extension in your browser
4. Click on "Export" and select "Export as JSON"
5. Create a file named `cookies.txt` in the project root directory and paste the copied cookies into this file

### 4. Start the application

```bash
python app.py
```

### 5. Access the interface

Open your web browser and navigate to `http://127.0.0.1:5000`

## 🖼️ Usage

1. Enter your creative prompt in the text area
2. Select your preferred orientation (landscape, portrait or square)
3. Choose an image aspect ratio
4. Click "Generate" to create your image
5. Download the generated image using the Download Icon

## App Screenshots

### Light Mode
![app-light-mode](https://github.com/user-attachments/assets/cf3a14b9-9cee-4194-9ea6-85153c790d4e)

### Dark Mode
![app-dark-mode](https://github.com/user-attachments/assets/18980fc4-de49-4525-9a93-2c8b78fa5ac9)

### Output Light Mode
![output-light](https://github.com/user-attachments/assets/c5c00e37-33ab-4ef4-8079-267a1b036d7b)

### Output Dark Mode
![output-dark](https://github.com/user-attachments/assets/959bddd1-f178-4be2-b85a-1e70f844ddf0)

## 📝 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the LICENSE file for details.

## ⚠️ Disclaimer

This project is not affiliated with or endorsed by Amazon Web Services. Use at your own risk.