import * as express from 'express';
import { multi, single } from './controller';
import sequelize from './utils/database';

// Constants
const PORT = process.env.STAGE === 'local' ? 8000 : 80;
const HOST = '0.0.0.0';

// App handlers
const app = express();

app.get('/single', single);
app.get('/multi', multi);

const start = async () => {
  try {
    await sequelize.sync(
      { force: false } // Reset db every time
    );

    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();
