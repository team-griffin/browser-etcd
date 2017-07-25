import { expect } from 'chai';
import sinon from 'sinon';
import mockHttp from 'mock-http-client';
import Client from '../../src/classes/Client';

describe('classes / Client', function(){
  it('should be a class', function(){
    expect(typeof Client).to.equal('function');
  });
  it('should have a get method', function(){
    const client = new Client();
    sinon.stub(client, 'request');
    const options = {};
    client.get(options);

    expect(client.request.calledWith('GET', options)).to.equal(true);
  });
  it('should have a put method', function(){
    const client = new Client();
    sinon.stub(client, 'request');
    const options = {};
    client.put(options);

    expect(client.request.calledWith('PUT', options)).to.equal(true);
  });
  it('should have a post method', function(){
    const client = new Client();
    sinon.stub(client, 'request');
    const options = {};
    client.post(options);

    expect(client.request.calledWith('POST', options)).to.equal(true);
  });
  it('should have a patch method', function(){
    const client = new Client();
    sinon.stub(client, 'request');
    const options = {};
    client.patch(options);

    expect(client.request.calledWith('PATCH', options)).to.equal(true);
  });
  it('should have a delete method', function(){
    const client = new Client();
    sinon.stub(client, 'request');
    const options = {};
    client.delete(options);

    expect(client.request.calledWith('DELETE', options)).to.equal(true);
  });

  describe('request', function(){
    it('should send a http request', function(){
      const http = mockHttp();
      const sampler = (arr => arr[0]);
      const client = new Client(['http://host'], {}, http, sampler);

      const method = 'POST';
      const options = {
        path : 'v2/keys/a/b'
      };

      http.expect('post', 'http://host/v2/keys/a/b', 1);

      client.request(method, options);

      http.assert();
    });
    it('should send the request headers & body', function(done){
      const http = mockHttp();
      const sampler = (arr => arr[0]);
      const client = new Client(['http://host'], {}, http, sampler);

      const method = 'PUT';
      const options = {
        path : 'v2/keys/a/b',
        body : {
          payload : 'foo'
        }
      };

      http.when('put', 'http://host/v2/keys/a/b', 1).call(config => {
        expect(config.headers.Accept).to.equal('application/json');
        expect(config.body.payload).to.equal('foo');
        done();
      });

      client.request(method, options);
    });

    it('should return the http response', function(done){
      const http = mockHttp();
      const sampler = (arr => arr[0]);
      const client = new Client(['http://host'], {}, http, sampler);

      const method = 'patch';
      const options = {
        path : 'v2/keys/a/b'
      };

      http.when('patch', 'http://host/v2/keys/a/b', 1).call(config => {
        return {
          data : 'bah'
        };
      });

      client.request(method, options).then(response => {
        expect(response.data).to.equal('bah');
        done();
      });
    });

  });

});
