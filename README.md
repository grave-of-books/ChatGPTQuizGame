# Ledger Legends v2
A ChatGPT interactive quiz game

# Getting Started
This project is built using React with Vite

You will also need a OpenAI API Key to play. 

### Instructions

- Node.js: Required to run JavaScript on the server and manage the project's dependencies.
- npm (Node Package Manager): Comes with Node.js and is used for managing dependencies.

### Installing Node.js and npm

1. **Download Node.js**: 

Visit [Node.js's website](https://nodejs.org/) and download the installer for your operating system. This will also install npm.

2. **Verify installation**: 

Open your terminal or command prompt and run the following commands to check that Node.js and npm are properly installed.

   ```bash
   node --version
   npm --version

3. **Download options for project**

a. download & unzip project files from GitHub repository 
    navigate to https://github.com/grave-of-books/ChatGPTQuizGame.
    Click on Code - Download Zip
    unzip files to an assessable location

b. GitClone:
    use git to clone the repository to your computer - (need to install git first)
    go to https://git-scm.com/downloads & install git for your operating system

    open terminal or command prompt 
    Enter the following:
    git clone https://github.com/grave-of-books/ChatGPTQuizGame.git
    (will create a directory named "ChatGPTQUizGame)
    cd ChatGPTQuizGame - navigate to root directory you created

4. **Run NPM to Install dependencies**

    open terminal 
    navigate to root directory (should be ChatGPTQuizGame) (use cd "folderName")
    type npm install

5. **Create .env File**
    open notepad and enter the following text:

    VITE_API_KEY=yourAPICodehere*
    *replace with your real API Key*

    save as other files, .env (no text before .env) in "ChatGPTQuizGame"
    enter the above notepad code without any spaces, otherwise it won't work

6. **Start Game Server**

    game runs on your computer's local server. To start, navigate to the root directory with terminal (ChatGPTQuizGame) and
    enter the following:

    npm run dev 

    vite will provide a link you can click to start the game (localhost:3000/)
    -the localhost number might be different depending on your settings