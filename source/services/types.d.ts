import services from '.';

declare module 'Types' {
  type Services = typeof services;
}
