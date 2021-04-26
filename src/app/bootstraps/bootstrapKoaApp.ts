import 'reflect-metadata';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import { AddressInfo } from 'net';
import Application from 'koa';
import { Server } from 'http';
import { createKoaServer } from 'routing-controllers';
import { connect, disconnect } from '../../database/database';
import mongo from 'mongodb';

let app: Application | null = null;
let server: Server | null = null;
let db: any;
export let usersMongo: any;

export async function bootstrapKoaApp(): Promise<Server> {
  app = createKoaServer({
    controllers: [
    ],
    middlewares: [
    ],
    // Official api allows only number as result code for nullResultCode and undefinedResultCode but it works with
    // custom error class in fact. It is done to force developers to set appropriate status codes explicitly
    // to prevent unpredictable behavior
    defaults: {
      // nullResultCode: ActionCannotReturnNullError as unknown as number,
      // undefinedResultCode: ActionCannotReturnUndefinedError as unknown as number,
    },
    defaultErrorHandler: true,
    validation: {
      whitelist: true,
      forbidNonWhitelisted: true,
    },
  }) as Application;

  app.use(bodyParser());
  app.use(koaLogger());

  return new Promise(resolve => {
    //connect();
    mongo.connect('mongodb://localhost:27017/users', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, async (err, client)=>{
      if (err) throw err;
      db = client.db('usersMongo');
      usersMongo = await db.createCollection('usersMongoPure')
      //console.log(db, usersMongo);
      //client.close();
    })
    server = (app as Application).listen(3000, () => {
      const { address, port } = (server as Server).address() as AddressInfo;
      console.log(`The server started on http://${address}:${port}`);

      resolve(server as Server);
    });
  });
}

export async function shutdownKoaApp(): Promise<void> {
  return new Promise((resolve, reject) => {
    //disconnect();
    (server as Server).close(err => {
      if (err) {
        reject(err);
      }

      server = null;
      app = null;
      console.log('The server shut down!');

      resolve();
    });
  });
}
