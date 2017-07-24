export default class Etcd {
  constructor(hosts, options, createClient) {
    this.hosts = hosts;
    this.options = options;
    this.client = createClient(hosts, options);
  }

  create(key, value, options) {
    return this.client.post({
      path: `/v2/keys/${key}`,
      body: {
        value,
      },
    });
  }

  set(key, value, options) {
    return this.client.put({
      path: `/v2/keys/${key}`,
      body: {
        value,
      },
    });
  }

  get(key, options) {
    return this.client.get({
      path: `/v2/keys/${key}`,
    });
  }

  del(key, options) {
    return this.client.delete({
      path: `/v2/keys/${key}`,
    });
  }
}
