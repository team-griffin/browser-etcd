import sample from 'lodash.sample';
import rxFetch from '@team-griffin/rxjs-fetch';
import url from 'url';

class Client {
  constructor(hosts, options) {
    this.hosts = hosts;
    this.options = options;
  }

  request(method, options) {
    const host = sample(this.hosts);
    const urlStr = url.resolve(host, url.format({
      pathname: options.path,
    }));

    let fetchOptions = {
      method,
      headers: {
        'Accept': 'application/json',
      }
    };

    if(options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    return rxFetch(urlStr, fetchOptions);
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


export const createClient = (hosts, options) => {
  return new Client(hosts, options);
};
export default Client;