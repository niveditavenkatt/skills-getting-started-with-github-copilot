# Getting Started with GitHub Copilot

_Get started using GitHub Copilot in less than an hour._

## Welcome

- **Who is this for**: Developers at any experience level looking to accelerate their code workflow.
- **What you'll learn**: The different ways to interact with Copilot to explain, write, debug, and develop code.
- **What you'll build**: You will guide Copilot to update Mergington High School's extracurricular activities website.
- **Prerequisites**:
  - Skills exercise: [Introduction to GitHub](https://github.com/skills/introduction-to-github)
  - Familiarity with [VS Code](https://code.visualstudio.com/)
  - Basic coding principles
- **How long**: This exercise takes less than one hour to complete.

In this exercise, you will:

1. Use a preconfigured Codespace to run VS Code in your browser.
1. Learn different interaction options to develop with GitHub Copilot.
1. Use Copilot to summarize and review your pull request.

### How to start this exercise

Simply copy the exercise to your account, then give your favorite Octocat (Mona) **about 20 seconds** to prepare the first lesson, then **refresh the page**.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=skills&template_name=getting-started-with-github-copilot&owner=%40me&name=skills-getting-started-with-github-copilot&description=Exercise:+Get+started+using+GitHub+Copilot&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account or an organization to host the repository.

- We recommend creating a public repository, since private repositories will use Actions minutes.
   
If the exercise isn't ready in 20 seconds, please check the [Actions](../../actions) tab.

- Check to see if a job is running. Sometimes it simply takes a bit longer.

- If the page shows a failed job, please submit an issue. Nice, you found a bug! 🐛

</details>

---

## React + TypeScript Application

This repository now includes a minimal React + TypeScript application with a landing page, placeholder components, and Jest tests.

### Project Structure

```
react-app/
├── components/
│   ├── Header.tsx           # Header component
│   ├── Footer.tsx           # Footer component
│   ├── Activities.tsx       # Activities list component
│   └── LandingPage.tsx      # Main landing page component
├── __tests__/
│   ├── App.test.tsx         # Tests for App component
│   ├── Header.test.tsx      # Tests for Header component
│   ├── Footer.test.tsx      # Tests for Footer component
│   ├── Activities.test.tsx  # Tests for Activities component
│   └── LandingPage.test.tsx # Tests for LandingPage component
├── public/
│   └── index.html           # HTML template
├── App.tsx                  # Main App component
├── index.tsx                # Entry point
└── setupTests.ts            # Jest setup file
```

### Installation

1. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

   This will install all required dependencies including React, TypeScript, Jest, and Webpack.

### Running the Application

1. **Start the development server:**

   ```bash
   npm start
   ```

   This will start the Webpack dev server on `http://localhost:3000` and automatically open it in your browser.

2. **Build for production:**

   ```bash
   npm run build
   ```

   This will create an optimized production build in the `dist/` directory.

### Running Tests

1. **Run all tests:**

   ```bash
   npm test
   ```

   This will run all Jest tests once.

2. **Run tests in watch mode:**

   ```bash
   npm run test:watch
   ```

   This will run tests in watch mode, re-running them whenever files change.

### Technologies Used

- **React 18**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **Webpack 5**: Module bundler
- **Babel**: JavaScript compiler

### Components Overview

- **App**: Main application component that combines Header, LandingPage, and Footer
- **Header**: Displays the school name and page title
- **LandingPage**: Main landing page with welcome section and activities
- **Activities**: Displays a list of available extracurricular activities
- **Footer**: Displays copyright information

### Python Backend (Optional)

The repository also includes a Python FastAPI backend in the `src/` directory. To run it:

```bash
pip install -r requirements.txt
uvicorn src.app:app --reload
```

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)