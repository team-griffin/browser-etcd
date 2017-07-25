import Client from '../classes/Client';
import Etcd from '../classes/Etcd';
import axios from 'axios';
import sample from 'lodash.sample';

export const createClient = (hosts, options) => {
  return new Client(hosts, options, axios, sample);
};

export const createEtcd = (hosts, options) => {
  return new Etcd(hosts, options, createClient);
};
