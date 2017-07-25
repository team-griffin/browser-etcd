import {expect} from 'chai';
import sinon from 'sinon';
import Etcd from '../../src/classes/Etcd';

describe('classes / Etcd', function(){
  beforeEach(function(){
    const client = {
      post : sinon.spy(),
      put : sinon.spy(),
      get : sinon.spy(),
      delete : sinon.spy()
    };
    const createClient = sinon.stub().returns(client);
    const hosts = [];
    const options = {};

    const etcd = new Etcd(hosts, options, createClient);

    Object.assign(this, {client, createClient, hosts, options, etcd});
  });

  it('should create a client on construction', function(){
    const {client, createClient, etcd} = this;

    expect(createClient.called).to.equal(true);
    expect(createClient.calledWith(etcd.hosts, etcd.options)).to.equal(true);
    expect(etcd.client).to.equal(client);
  });

  it('create should send a post request', function(){
    const {client, etcd} = this;
    const expected = {
      path : '/v2/keys/a',
      body : {
        value : 'b'
      }
    };

    etcd.create('a', 'b');

    expect(client.post.called).to.equal(true);
    expect(client.post.calledWith(expected)).to.equal(true);
  });
  it('set should send a put request', function(){
    const {client, etcd} = this;
    const expected = {
      path : '/v2/keys/a',
      body : {
        value : 'b'
      }
    };

    etcd.set('a', 'b');

    expect(client.put.called).to.equal(true);
    expect(client.put.calledWith(expected)).to.equal(true);
  });
  it('create should send a get request', function(){
    const {client, etcd} = this;
    const expected = {
      path : '/v2/keys/a'
    };

    etcd.get('a');

    expect(client.get.called).to.equal(true);
    expect(client.get.calledWith(expected)).to.equal(true);
  });
  it('del should send a delete request', function(){
    const {client, etcd} = this;
    const expected = {
      path : '/v2/keys/a'
    };

    etcd.del('a');

    expect(client.delete.called).to.equal(true);
    expect(client.delete.calledWith(expected)).to.equal(true);
  });
});
