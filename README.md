# x-algod

**x-algod** is a community-first, extensible proxy layer for the Algorand `algod` API.  
It allows developers to compose and expose useful API endpoints on top of the existing node interface — without altering the node api itself.

---

## 🌐 What is x-algod?

x-algod is a thin proxy layer designed to sit in front of any Algorand `algod` node. It transparently forwards native requests while also exposing a new `/community/*` namespace. This namespace serves as a space for developers to build useful abstractions and utilities using standard `algod` calls — without modifying the node api, breaking compatibility, or waiting on core protocol changes.

It enables:
- Rapid prototyping of frequently needed functionalities
- Modular community-contributed endpoints
- A safe experimentation space for ideas that may eventually be standardized

In essence, **x-algod gives the Algorand ecosystem an unofficial innovation layer**.

---

## 💡 Motivation

While the Algorand stack is clean and well-layered (`algod`, SDKs, AlgoKit), there's no safe and standardized space for community-contributed features to live, grow, and evolve **between algod and the SDKs**.

x-algod is intended to fill this gap.

---

## 🎯 Goals

- Provide a transparent proxy for `algod`
- Introduce a `/community/*` namespace for new utilities
- Encourage experimentation with no risk to node api compatibility
- Allow endpoint proposals to mature before SDK integration

---

## 🧩 Architecture

```txt
   SDKs / Clients
        │
        ▼
    ┌───────────┐
    │ x-algod   │   ← Proxy layer with extensions
    └────┬──────┘
         │
         ▼
     ┌─────────┐
     │ algod   │   ← Unmodified node api
     └─────────┘
```

---

## 📁 Project Structure

```txt
x-algod/
├── README.md                  # Main project overview
├── js-x-algod/                # Node.js proof of concept
│   ├── x-algod.js             # Express proxy and community endpoints
│   ├── package.json           # Node.js project config (optional)
│   └── README.md              # POC-specific documentation
├── py-x-algod/ (planned)      # Future: Python implementation
└── extensions/ (planned)      # Shared specs, tests, and reference utils
```

---

## 📦 Subprojects

| Name         | Description                         | Status |
|--------------|-------------------------------------|--------|
| `js-x-algod` | Node.js proof-of-concept proxy      | ✅ Working |

More implementations may follow in Python, Rust, or Go.

---

## 🔍 Example Community Endpoint

```http
GET /community/accounts/:address/transactions/notes/:note
```

> Scans the last N blocks and returns matching transactions by note for a specific address.

---

## 🤝 Contribute

- Fork this repo
- Add your endpoint under `/community/`
- Open a PR to share your utility with others

---

## 📘 License

MIT
