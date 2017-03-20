import { createClient } from './Client';
import { toPromise } from 'rxjs/operator/toPromise';
import { switchMap } from 'rxjs/operator/switchMap';
import { failOnHttpError, parseJson} from '@team-griffin/rxjs-fetch';

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
      ::failOnHttpError()
      ::parseJson()
      ::toPromise();
  }

  set(key, value, options) {
    return this.client.put({
      path: `/v2/keys/${key}`,
      body: {
        value,
      },
    })
      ::failOnHttpError()
      ::parseJson()
      ::toPromise();
  }

  get(key, options) {
    return this.client.get({
      path: `/v2/keys/${key}`,
    })
      ::failOnHttpError()
      ::parseJson()
      ::toPromise();
  }

  del(key, options) {
    return this.client.delete({
      path: `/v2/keys/${key}`,
    })
      ::failOnHttpError()
      ::parseJson()
      ::toPromise();
  }
}

export const createEtcd = (hosts, options) => {
  return new Etcd(hosts, options, createClient);
};
export default Etcd;