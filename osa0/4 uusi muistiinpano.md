```mermaid
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: uudelleenohjaus sivulle https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server
```