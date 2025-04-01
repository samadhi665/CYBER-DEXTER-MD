const fs = require("fs");
require("dotenv").config();

const parseBoolean = (value, defaultValue) => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

const config = {
  // Session Configuration
  SESSION_ID: process.env.SESSION_ID || "CYBER-DEXTER-MD [KILL]>>>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlLbVl0Y2h4THRNQnBQTlVwd0Nqb3IyN09wK29wUGM3YnI5d09NZDVIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXlRQzB1WE9jY0ZabytLUVF0Njl2bTNudlZLVzFxZEtGdUFmVGxSaFQzUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTTRtOEFwNzk2b0xoT2NBNy94VUQydi8wS0hNNUNpM1QxcW9PeVpCeDNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3MUZHYXhnUFlhN1hWOFBrSkdiN3NseVZDRm1kamVmTlJnYlFtMTNQL2lZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRCUFRsa1JWaUI1Z010M1Qxek1sdXFGM2dJMFM1dVhQblo5bHFIYnhoa2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkY2QlNNOERNSVZQTFczcUU0QzJrejVqZTQxYXc5NnZJVjRhR1pNODB6bjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENnVWhTZ01laVYzRXFZeGxhbDJkL2ZUeHN6SVJ3NStXekVpdXZhZVBtVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU9GbjBrM090RjNrbFRHSTl1WHRnUTVpTHNYalpHVW1GZzBMK3FTWWZBWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJXU2VCZWNSTjBScjBhRm4vYjU2a09lYTR0OUxKVXVnTmF1YXdTVi96MXA1SXBob2FvM0o3aW13eXQ0UjRZbDZzTGxyM0ZJczBJbFFUQ1pjVUxqb0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY5LCJhZHZTZWNyZXRLZXkiOiJOKzRQSkVXTjhLSmNsRmVvelNTeURvNWtibE1XZTZaWVhDNXNLVmNKWVAwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwcnZxbmZxNVRxS2xvZVdFcm10LXhBIiwicGhvbmVJZCI6Ijk0MzRmZDQ0LThiYmEtNGJiNC05OGJiLWEzODMzNzdkZGY4NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTThrU2dDdnlMZndEYnRYdTc1VlhCSG84NzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXI3TFEwOVZQdkkwemx5QUE3enpJNkRxVk1RPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNYNFI0UUg4IiwibWUiOnsiaWQiOiI5NDcyMjMwMjA3OTo1MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJAIH4gXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4gUktDIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLek1nOHdGRUt5c3JyOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJLWHlNUjJROGRrZ1kyY1QxN2wrTHRhQWVnand2Wm5vSURPL1VqQWxSOFRnPSIsImFjY291bnRTaWduYXR1cmUiOiJ6TzZVejhqdE10ckZSajF4bGRLTlVUSHkzaVBCbW1jQXd1YkJWRjUyb2cxcHdTT0J5eVNZbmxtRHI3bDlFdW1mTUY2MmU1dkxZL1pOKzZHcTFPODlDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiV0ZSRkVESi9adHNoODF5MHozZjFSZDBPQ0hUbUEwU3R3djlrdDhvbDZXc0VkTlJwY3hJQjBWelRwUWhNS05IS0xvOWkrcjlzemtkTFhobUlla0dSQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcyMjMwMjA3OTo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTbDhqRWRrUEhaSUdObkU5ZTVmaTdXZ0hvSThMMlo2Q0F6djFJd0pVZkU0In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzNDkyNjY1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJXbSJ9",
  PREFIX: process.env.PREFIX || ".",
  
  // Auto Features
  AUTO_STATUS_SEEN: parseBoolean(process.env.AUTO_STATUS_SEEN, true),
  AUTO_STATUS_REACT: parseBoolean(process.env.AUTO_STATUS_REACT, true),
  AUTO_STATUS_REPLY: parseBoolean(process.env.AUTO_STATUS_REPLY, false),
  AUTO_STATUS_REPLY_VOICE: parseBoolean(process.env.AUTO_STATUS_REPLY_VOICE, false),
  AUTO_STATUS_REPLY_VOICE_MULTI: parseBoolean(process.env.AUTO_STATUS_REPLY_VOICE_MULTI, false),
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || "*📍 Auto Status Seen Bot By CYBER-DEXTER-MD*",

  AUTO_DL: parseBoolean(process.env.AUTO_DL, false),
  AUTO_READ: parseBoolean(process.env.AUTO_READ, false),
  AUTO_TYPING: parseBoolean(process.env.AUTO_TYPING, true),
  AUTO_RECORDING: parseBoolean(process.env.AUTO_RECORDING, false),
  AUTO_STATUS_REACT: parseBoolean(process.env.AUTO_STATUS_REACT, false),
  ALWAYS_ONLINE: parseBoolean(process.env.ALWAYS_ONLINE, false),

  // Call Settings
  REJECT_CALL: parseBoolean(process.env.REJECT_CALL, false),

  // General Settings
  NOT_ALLOW: parseBoolean(process.env.NOT_ALLOW, true),
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤CYBER-DEXTER",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94789958225",

  // API Keys
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",

  // Features
  WELCOME: parseBoolean(process.env.WELCOME, true),

  // Trigger Words
  triggerWords: [
    "ඔනි", "send", "එවන්න", "sent", "giv", "gib", "upload",
    "send me", "sent me", "znt", "snt", "ayak", "do", "mee", "autoread"
  ],
};

module.exports = config;
