## The diagram using Mermaid syntax depicting the situation where the user creates a new note using the single-page version of the app:
```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open the single-page app
    Browser->>Server: Fetch app resources (HTML, JS)
    activate Server
    Server-->>Browser: App resources
    deactivate Server
    Browser->>User: Display app interface

    User->>Browser: Write a new note
    Browser->>User: Display note editing interface
    User->>Browser: Enter note content
    User->>Browser: Click Save button
    Browser->>Server: Send POST request to create note: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: Note created successfully
    deactivate Server

    Browser->>Server: Fetch updated note data GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: Updated note data
    deactivate Server
    Browser->>User: Display updated notes on the app
```
