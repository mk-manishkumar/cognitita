# Cognitia

Cognitia is a personal study library for organizing Markdown notes by subject and revising them in a focused reading flow. The repository’s `.md` files are the source of truth: Cognitia reads and displays them, while note creation and editing happen directly in the project files.

## Contents

- [Cognitia](#cognitia)
  - [Contents](#contents)
  - [Project goals](#project-goals)
  - [Features](#features)
  - [Technology](#technology)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Install and run](#install-and-run)
  - [Managing notes](#managing-notes)
    - [Current folders](#current-folders)
  - [Project structure](#project-structure)
  - [Routes](#routes)
  - [Build and preview](#build-and-preview)
  - [Architecture notes](#architecture-notes)

## Project goals

- Keep the application simple and personal.
- Store study content as readable, version-controlled Markdown files.
- Organize notes by subject, group, topic, and chapter.
- Avoid a database, backend, authentication, and browser-based note editing.

## Features

- Browse Computer Science topics grouped under Core Subjects and Web Development.
- Read chapter notes rendered from Markdown, including GitHub Flavored Markdown tables and task lists.
- Search note titles, subjects, and full note content across the library.
- Use a session-only revision flow that reveals one note at a time.
- View individual notes on a dedicated, readable page.

## Technology

- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4 
- `react-markdown` and `remark-gfm` for Markdown rendering
- Lucide React icons
- JavaScript and JSX

## Getting started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal. Stop the development server with `Ctrl+C` when finished.

## Managing notes

Cognitia does not create, edit, or delete notes in the browser. Add or edit `.md` files in the matching topic folder. Existing topics are discovered automatically by Vite.

### Current folders

```text
src/data/Computer Science/
├── Core Subjects/
│   └── DSA/
│       ├── chapter-1.md
│       └── chapter-2.md
└── Web Development/
    ├── Backend from First Principles/
    │   └── chapter-1.md
    ├── MongoDB/
    │   └── chapter-1.md
    └── NodeJS and ExpressJS/
        └── chapter-1.md
```

To add a chapter to an existing topic, create a file named `chapter-N.md` in that topic’s folder. For example:

```text
src/data/Computer Science/Web Development/MongoDB/chapter-2.md
```

Use Markdown headings, paragraphs, lists, code fences, and tables as needed. For a chapter title, the app uses the first level-two heading (`##`), falling back to the first level-one heading (`#`). When that level-two heading starts with a numbered section such as `1.`, the app uses the first level-one heading instead. For other Markdown filenames, the first level-one heading is used as the note title; if there is none, the filename is used.

The folder immediately containing a note file must match the topic name in `src/data/curriculum.js`. To add a new topic, add its curriculum entry and create a matching folder under the appropriate group. The topic name determines how notes are grouped in the app.

After adding or changing a file, refresh the app if needed. Run a new production build to include content changes in a deployment.

## Project structure

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                     # Routes, global search, and page composition
    ├── main.jsx                    # React entry point and BrowserRouter
    ├── style.css                   # Tailwind import and theme tokens
    ├── components/
    │   ├── AppHeader.jsx
    │   ├── Library.jsx
    │   ├── MarkdownContent.jsx
    │   ├── NoteCard.jsx
    │   ├── NotePage.jsx
    │   ├── Review.jsx
    │   ├── Sidebar.jsx
    │   ├── TopicPage.jsx
    │   └── childcomponent/
    │       ├── ComputerScience.jsx
    │       ├── LearningGroupCard.jsx
    │       ├── SubjectHome.jsx
    │       └── TopicLink.jsx
    ├── data/
    │   ├── curriculum.js           # Subject, group, and topic definitions
    │   └── Computer Science/       # Markdown notes grouped by curriculum
    └── lib/
        └── notes.js                # Markdown discovery and note metadata
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Subject home |
| `/computer-science` | Computer Science groups and topics |
| `/computer-science/:topic` | Notes for a topic |
| `/note/:noteId` | Individual note reader |
| `/notes` | Full note library |
| `/review` | Session-only revision flow |

Search is global and filters the title, subject, and body of every discovered note. Search results temporarily replace the current page; clearing the query returns to the previous route.

## Build and preview

```bash
npm run build
npm run preview
```

The production output is written to `dist/`, which is excluded from Git. When deploying to static hosting, configure the host to serve `index.html` as a fallback for client-side routes such as `/computer-science/mongodb` and `/note/...`.

## Architecture notes

- Notes are discovered at build time with Vite’s `import.meta.glob` and bundled into the frontend. There is no runtime filesystem access.
- Browser storage is not used for notes or revision progress. Revision progress exists only while the revision page remains mounted.
- Markdown content included in a deployment can be inspected by anyone who can access that deployment. Do not store secrets or private information in these files.
- The app currently has no backend, database, authentication, or server-side API.
