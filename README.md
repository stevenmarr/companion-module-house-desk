# companion-module-house-desk

Bitfocus Companion connection for the house Control Center. It drives the desk over HTTP: numbered master memories and Event Master presets, ATEM program/preview, DVE, SuperSource, and luma encoders, macros, and PTZ recalls. Program buttons light red. Preview buttons light green.

Set **Control Center URL** to the desk, for example `http://127.0.0.1:8080`.

## Install

Companion looks for a developer module whose folder contains `companion/manifest.json`.

```bash
git clone https://github.com/stevenmarr/companion-module-house-desk.git
cd companion-module-house-desk
npm install
```

Point Companion's developer module path at this folder, then add a **house-desk** connection.

Requires Node 22 and Companion with the nodejs-ipc module API.
