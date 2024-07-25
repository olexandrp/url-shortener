import store from './DataStore.ts';

const UrlModel = store.defineMapper("url", {
  endpoint: '/models/url',
  defaultValues: {
    longUrl: '',
    shortUrl: '',
    createdAt: 0
  },
  schema: {
    key: "id",
    properties: {
      longUrl: { type: "string" },
      shortUrl: { type: "string" },
      createdAt: { type: "number" },
    },
  }
});

export default UrlModel;