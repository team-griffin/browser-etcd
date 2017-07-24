import sample from 'lodash.sample';
import url from 'url';

export default class Client {
  constructor(hosts, options, http) {
    this.hosts = hosts;
    this.options = options;
    this.http = http;
  }

  request(method, options) {
    const host = sample(this.hosts);
    const urlStr = url.resolve(host, url.format({
      pathname: options.path,
    }));

    const config = {
      url : urlStr,
      method,
      headers: {
        'Accept': 'application/json',
      }
    };

    if(options.body) {
      config.body = options.body;
    }

    return this.http(config);
  }

  get(options) {
    return this.request('GET', options);
  }

  put(options) {
    return this.request('PUT', options);
  }

  post(options) {
    return this.request('POST', options);
  }

  patch(options) {
    return this.request('PATCH', options);
  }

  delete(options) {
    return this.request('DELETE', options);
  }
}
