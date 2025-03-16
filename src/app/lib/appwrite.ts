import { Client, Account } from 'appwrite';
import { environment } from '../../../environment';
export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(environment.projectID);

export const account = new Account(client);
export { ID } from 'appwrite';
