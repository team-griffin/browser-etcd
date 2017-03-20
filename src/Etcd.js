import { createClient } from './Client';
import { toPromise } from 'rxjs/operator/toPromise';
import { switchMap } from 'rxjs/operator/switchMap';

class Etcd {
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
    })
      .failOnHttpError()
      ::switchMap((response) => {
        return response.json();
      })
      ::toPromise();
  }

  set(key, value, options) {
    return this.client.put({
      path: `/v2/keys/${key}`,
      body: {
        value,
      },
    })
      .failOnHttpError()
      ::switchMap((response) => {
        return response.json();
      })
      ::toPromise();
  }

  get(key, options) {
    return this.client.get({
      path: `/v2/keys/${key}`,
    })
      .failOnHttpError()
      ::switchMap((response) => {
        return response.json();
      })
      ::toPromise();
  }

  del(key, options) {
    return this.client.delete({
      path: `/v2/keys/${key}`,
    })
      .failOnHttpError()
      ::switchMap((response) => {
        return response.json();
      })
      ::toPromise();
  }
}

export const createEtcd = (hosts, options) => {
  return new Etcd(hosts, options, createClient);
};
export default Etcd;