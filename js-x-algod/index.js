const express = require("express");
const axios = require("axios");
const base64 = require("base-64");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"));

const ALGOD_HOST = process.env.ALGOD_HOST || "https://testnet-api.4160.nodely.dev:443";
const ALGOD_TOKEN = process.env.ALGOD_TOKEN || "";

const HEADERS = { "X-Algo-API-Token": ALGOD_TOKEN };

// Use raw body handling for binary content compatibility
app.use(bodyParser.raw({ type: "*/*", limit: "10mb" }));

// Proxy all requests except /community/*
app.use(async (req, res, next) => {
    if (req.path.startsWith("/community/")) return next();

    const url = `${ALGOD_HOST}${req.originalUrl}`;

    try {
        const response = await axios({
            method: req.method,
            url,
            headers: {
                ...HEADERS,
                ...req.headers,
                host: undefined // strip to avoid mismatch with upstream
            },
            data: req.body,
            responseType: "arraybuffer",
            validateStatus: () => true,
        });

        // Clean headers
        const responseHeaders = {};
        for (const [key, value] of Object.entries(response.headers)) {
            const lower = key.toLowerCase();
            if (["content-encoding", "transfer-encoding"].includes(lower)) continue;
            responseHeaders[key] = value;
        }

        // Set Content-Length explicitly
        responseHeaders["Content-Length"] = Buffer.byteLength(response.data);

        res.set(responseHeaders);
        res.status(response.status).send(response.data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Community endpoint: search transactions by note
app.get("/community/accounts/:address/transactions/notes/:note", async (req, res) => {
    try {
        const { address, note } = req.params;
        const rounds = parseInt(req.query.rounds || "100");

        const statusResp = await axios.get(`${ALGOD_HOST}/v2/status`, {
            headers: HEADERS,
        });

        const lastRound = statusResp.data["last-round"];
        const noteB64 = base64.encode(note);
        const matchingTxns = [];

        for (let r = lastRound; r > lastRound - rounds; r--) {
            const blockResp = await axios.get(`${ALGOD_HOST}/v2/blocks/${r}`, {
                headers: HEADERS,
            });

            const txns = blockResp.data.block?.txns || [];
            for (const txn of txns) {
                if (txn.txn.snd !== address) continue;
                if (txn.txn.note === noteB64) {
                    matchingTxns.push(txn);
                }
            }
        }

        res.json({
            address,
            note,
            matched_transactions: matchingTxns,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
    console.log(`Smart Algod proxy running on port ${PORT}`);
});
