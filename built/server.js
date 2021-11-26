"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const database_1 = require("./utils/database");
// Constants
const PORT = process.env.STAGE === 'local' ? 8000 : 80;
const HOST = '0.0.0.0';
// App handlers
const app = express();
app.get('/single', controller_1.single);
app.get('/multi', controller_1.multi);
const start = async () => {
    try {
        await database_1.default.sync({ force: false } // Reset db every time
        );
        app.listen(PORT, HOST);
        console.log(`Running on http://${HOST}:${PORT}`);
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=server.js.map