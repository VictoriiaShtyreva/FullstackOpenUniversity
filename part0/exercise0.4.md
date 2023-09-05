## The diagram was made as a GitHub Markdown-file using the Mermaid-syntax:

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open https://studies.cs.helsinki.fi/exampleapp/notes
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: HTML page
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: CSS file
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: JavaScript file

    User->>Browser: Write a note and click Save
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/notes with data
    Server-->>Browser: Note created successfully

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: Updated note data

    Browser->>User: Render updated notes on the page
    
```