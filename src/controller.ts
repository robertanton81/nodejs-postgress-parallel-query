import sequelize from './utils/database';

const requestCount = 3;
const simulateLongRunningQuery = () => sequelize.query('SELECT pg_sleep(1)');

export async function single(req: any, res: any) {
  const start = Date.now();
  console.log('single');

  await simulateLongRunningQuery();
  await simulateLongRunningQuery();
  await simulateLongRunningQuery();

  const end = Date.now() - start;
  console.log(end);
  res.send({ requestCount: requestCount, took: end.toString() });
}

// this is a way of running concurrent db queries and reduce the waiting time
// the result could be destructured like this
// const [firstRequest, secondRequest] = await Promise.all();
export async function multi(req: any, res: any) {
  const start = Date.now();
  console.log('multi');

  await Promise.all([
    simulateLongRunningQuery(),
    simulateLongRunningQuery(),
    simulateLongRunningQuery(),
  ]);

  const end = Date.now() - start;
  console.log(end);
  res.send({ requestCount: requestCount, took: end.toString() });
}
