# Local Development Setup

To run Craviston's website on your local machine, follow these steps:

## Prerequisites

1.  **Node.js**: Ensure you have Node.js (v18 or higher) installed.
2.  **API Keys**: You will need a Google Gemini API key to run the AI features (CraveMatch).
    - Get a key from [Google AI Studio](https://aistudio.google.com/).
3.  **Logo**: Ensure your `logo.png` is placed in the `public/` folder.

## Setup Instructions

1.  **Extract the ZIP**: Unzip the project folder.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your API key:
    ```env
    GOOGLE_GENAI_API_KEY=your_api_key_here
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **View the App**: Open [http://localhost:9002](http://localhost:9002) in your browser.

## Project Structure
- `src/app`: Next.js pages and layouts.
- `src/components`: UI components (Hero, Menu, Navigation, etc.).
- `src/ai`: Genkit flows for the CraveMatch AI tool.
- `public/`: Static assets like your brand logo.
