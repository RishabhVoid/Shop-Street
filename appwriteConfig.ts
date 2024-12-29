import { Client, Account, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6763e25a0001e02a156c');

export const account = new Account(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';
