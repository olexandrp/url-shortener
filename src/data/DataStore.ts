import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const store = new DataStore();

store.registerAdapter("http", new HttpAdapter({
  basePath: BASE_URL
}), { "default": true });

export default store;