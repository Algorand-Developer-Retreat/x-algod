# x-algod

**js-x-algod** is an extended proxy layer for Algorand's `algod` API.  
It preserves the native interface while adding community-driven endpoints — no changes to the node required.

## 🚀 What It Does

- Proxies all requests to an `algod` node, preserving status codes, headers, and responses
- Adds a `/community/*` namespace for extended functionality
- Allows developers to experiment, test, and share high-level utilities on top of `algod`
- Includes an example endpoint to search transactions by note

---

## 🧱 Features

- ✅ Transparent proxy for all `algod` routes (`/v2/*`, `/status`, etc.)
- ✅ Compatible with JSON, binary, and text responses
- ✅ Clean, isolated extension zone: `/community/*`
- ✅ Ships with a sample endpoint:  
  `GET /community/accounts/:address/transactions/notes/:note`

---

## 📦 Requirements

- Node.js 16+
- Optional `.env` file for custom config

---

## ⚙️ Setup

```bash
git clone https://github.com/your-org/x-algod.git
cd x-algod
npm install


