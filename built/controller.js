"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multi = exports.single = void 0;
const database_1 = require("./utils/database");
const requestCount = 5;
const simulateLongRunningQuery = () => database_1.default.query('SELECT pg_sleep(1)');
async function single(req, res) {
    const start = Date.now();
    console.log('single');
    for (let i = 0; i < requestCount; i++) {
        await simulateLongRunningQuery();
    }
    const end = Date.now() - start;
    console.log(end);
    res.send({ requestCount: requestCount, took: end.toString() });
}
exports.single = single;
// this is a way of running concurrent db queries and reduce the waiting time
// the result could be destructured like this
// const [firstRequest, secondRequest] = await Promise.all();
async function multi(req, res) {
    const start = Date.now();
    console.log('multi');
    await Promise.all(Array(requestCount)
        .fill(1)
        .map((_) => simulateLongRunningQuery()));
    const end = Date.now() - start;
    console.log(end);
    res.send({ requestCount: requestCount, took: end.toString() });
}
exports.multi = multi;
//# sourceMappingURL=controller.js.map