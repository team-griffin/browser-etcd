import {expect} from 'chai';
import * as methods from '../../src/methods';
import Client from '../../src/classes/Client';
import Etcd from '../../src/classes/Etcd';
import axios from 'axios';
import sample from 'lodash.sample';

describe('methods', function(){
  describe('createClient', function(){
    it('should create a new client', function(){
      const client = methods.createClient([], {});

      expect(client).to.be.defined;
      expect(client instanceof Client).to.equal(true);
    });
    it('should use axios as the http service', function(){
      const client = methods.createClient([]);

      expect(client.http).to.equal(axios);
    });
    it('should use lodash sample as the host sampler', function(){
      const client = methods.createClient([]);

      expect(client.sampler).to.equal(sample);
    });
  });

  describe('createEtcd', function(){
    it('should create a new etcd instance', function(){
      const etcd = methods.createEtcd([], {});

      expect(etcd).to.be.defined;
      expect(etcd instanceof Etcd).to.equal(true);
    });
    it('should use createClient as the client creator', function(){
      const etcd = methods.createEtcd([]);

      expect(etcd.client instanceof Client).to.equal(true);
    });

  });

});
