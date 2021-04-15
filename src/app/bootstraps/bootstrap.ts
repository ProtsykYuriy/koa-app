import { Server } from 'http';
import { bootstrapKoaApp } from './bootstrapKoaApp';

export async function bootstrap(): Promise<Server> {
  const server = bootstrapKoaApp();
  return server;
}
