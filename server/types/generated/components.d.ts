import type { Schema, Attribute } from '@strapi/strapi';

export interface BahaBaha21 extends Schema.Component {
  collectionName: 'components_baha_baha21s';
  info: {
    displayName: 'baha21';
    icon: 'calendar';
  };
  attributes: {};
}

export interface BahaBahador extends Schema.Component {
  collectionName: 'components_baha_bahadors';
  info: {
    displayName: 'Bahador';
    icon: 'calendar';
  };
  attributes: {
    userName: Attribute.String;
    userQuery: Attribute.String;
    userPhone: Attribute.String;
    userComment: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'baha.baha21': BahaBaha21;
      'baha.bahador': BahaBahador;
    }
  }
}
