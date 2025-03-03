# Abyssinian

Abyssinian is a web-based platform designed to create a public repository of sentences with their corresponding emotive meanings. This project leverages machine learning to predict emotions in text and provide sentence transformations. Built using the **FARMstack** tech stack, Abyssinian offers a seamless experience for users to explore and analyze emotive text data.

## Features
- **Sentence Emotive Analysis**: Uses `j-hartmann/emotion-english-distilroberta-base` model to predict the emotional meaning of sentences.
- **WebSocket Integration**: Enables real-time chat functionality.
- **Structured File System**:
  - `frontend/` - Handles the web interface and user interactions.
  - `backend/` - Manages API requests, model integration, and WebSocket connections.
  - `dataset_handle/` - Processes and stores sentence datasets on dedicated github repo for emotive analysis.
- **Multi-Page Web Interface**:
  - **Home Page**: Introduction and overview of the platform.
  - **Chat Page**: Supports real-time messaging, featuring:
    - **DM**: Private messages.
    - **Group**: Group chat functionality.
  - **About Page**: Information about the project and its purpose.

## Tech Stack
- **Frontend**: React.js
- **Backend**: FastAPI
- **Database**: MongoDB
- **Machine Learning Model**: `j-hartmann/emotion-english-distilroberta-base`
- **Real-time Communication**: WebSockets

## Installation
### Prerequisites
Ensure you have the following installed:
- Python (>=3.8)
- Node.js & npm
- MongoDB

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/Pequanta/Abyssinian.git
   cd Abyssinian
   ```

2. **Set up the backend**
   ```sh
   cd backend
   pip install -r requirements.txt
   python3 main.py
   ```

3. **Set up the frontend**
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Configure the database**
   - Ensure MongoDB is running
   - Set up the required collections and indexes

## Usage
- Navigate to `http://localhost:5173` to access the web platform.
- Use the Chat Page for real-time messaging.
- Explore sentence emotions and contribute new data.

## Contributing
Any contributions are welcomed! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out via GitHub Issues or email.

---
**Abyssinian - Understanding Emotions in Text**

