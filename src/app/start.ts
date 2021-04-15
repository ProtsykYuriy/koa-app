import { bootstrap } from './bootstraps/bootstrap';
import { shutdown } from './bootstraps/shutdown';

bootstrap()
  .catch((err: Error) => {
    console.error(err.message, err);
    shutdown().finally(() => {
      process.exit(1);
    });
  });
