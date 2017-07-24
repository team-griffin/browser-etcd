import Client from './classes/Client';
import Etcd from './classes/Etcd';
import axios from 'axios';

export const createClient = (hosts, options) => {
  return new Client(hosts, options, axios);
};

export const createEtcd = (hosts, options) => {
  return new Etcd(hosts, options, createClient);
};
