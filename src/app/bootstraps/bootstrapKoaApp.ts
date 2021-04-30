import 'reflect-metadata';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import { AddressInfo } from 'net';
import Application from 'koa';
import { Server } from 'http';
import { createKoaServer } from 'routing-controllers';
import { RoomController } from '../controllers/app-controlers';
import { createConnection } from 'typeorm';
import { User } from '../entity/user';
import "reflect-metadata";

let app: Application | null = null;
let server: Server | null = null;
let db: any;


export async function bootstrapKoaApp(): Promise<Server> {
  app = createKoaServer({
    controllers: [
      RoomController
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

  return new Promise(async resolve => {

    //connect();

    // await createConnection({
    //   url: 'mongodb://localhost:27017/users',
    //   type: "mongodb",
    //   host: "localhost",
    //   port: 27017,
    //   // username: "test",
    //   // password: "test",
    //   database: "GrandBudapest",
    //   //entities: ["src/database/users/user.ts"],
    // })

    createConnection().then(async connection => {
      console.log("Inserting a new User into the database...");
      const std = new User();
      std.name = "Student1";

      console.log('still going ...')

      await connection.manager.save(std);
      console.log("Saved a new user with id: " + std._id);

      console.log("Loading users from the database...");
      const stds = await connection.manager.find(User);
      console.log("Loaded users: ", stds);

      console.log("TypeORM with MongoDB");
    }).catch(error => {
      console.log(error)
    });

    server = (app as Application).listen(3000, () => {
      const { address, port } = (server as Server).address() as AddressInfo;
      console.log(`The server started on http://${address}:${port}`);

      resolve(server as Server);
    });
  });
}

export async function shutdownKoaApp(): Promise<void> {
  return new Promise((resolve, reject) => {
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
