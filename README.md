# Junyi Knowledge Map

This application generates a visualization of a network roadmap based on a CSV data file containing a knowledge tree, making it easy to see the interconnected nodes within the tree.

## Pre-requirements

### Node

This App required Node v16.x or later version on your local development machine.

### Install package

To begin using the app, you must first install the required package by running the following command:

```
npm install
```

## Getting Started

First, run the development server:

```bash
npm run watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deploy on Github

Here is the Github page: [https://junyiacademy.github.io/junyi-knowledge-map-next/](https://junyiacademy.github.io/junyi-knowledge-map-next/)

## Folder Structures

```
junyi-knowledge-map-next
├── pages
│   └── index.tsx (The main page of this app)
└── components
    ├── hooks
    │   ├── useVisNetwork.ts (Custom hook for building VisNetwork)
    │   └── useFetchData.ts (Fetch topic csv file)
    └── layer
        └── Layout.tsx (Shared layout)
```
