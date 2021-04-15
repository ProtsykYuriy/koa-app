import { shutdownKoaApp } from './bootstrapKoaApp';

export async function shutdown(): Promise<void> {
  await shutdownKoaApp();
}
