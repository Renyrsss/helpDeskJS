import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginGraphsBuilderGraph extends Schema.CollectionType {
  collectionName: 'graphs_builder_graph';
  info: {
    name: 'graph';
    description: '';
    singularName: 'graph';
    pluralName: 'graphs';
    displayName: 'Graph';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: true;
    };
    'content-type-builder': {
      visible: true;
    };
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['pie', 'bar', 'line', 'dateLine']> &
      Attribute.Required;
    collectionX: Attribute.String & Attribute.Required;
    collectionXAttribute: Attribute.String;
    Tags: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::graphs-builder.graph',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::graphs-builder.graph',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAidarAidar extends Schema.CollectionType {
  collectionName: 'aidars';
  info: {
    singularName: 'aidar';
    pluralName: 'aidars';
    displayName: '\u0410\u0439\u0434\u0430\u0440';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    ourComment: Attribute.String;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'B'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::aidar.aidar',
      'oneToOne',
      'admin::user'
    >;
    updatedBy: Attribute.Relation<
      'api::aidar.aidar',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiBahadorBahador extends Schema.CollectionType {
  collectionName: 'bahadors';
  info: {
    singularName: 'bahador';
    pluralName: 'bahadors';
    displayName: '\u0411\u0430\u0445\u043E\u0434\u044B\u0440';
    description: '';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    ourComment: Attribute.Text;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'C'>;
    ProgressData: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bahador.bahador',
      'oneToOne',
      'admin::user'
    >;
    updatedBy: Attribute.Relation<
      'api::bahador.bahador',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiElektrikElektrik extends Schema.CollectionType {
  collectionName: 'elektriks';
  info: {
    singularName: 'elektrik';
    pluralName: 'elektriks';
    displayName: '\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u043A';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043C\u043E ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    OurComment: Attribute.Text;
    executor: Attribute.Enumeration<
      [
        '\u0411\u0430\u0437\u0433\u0443\u0442\u0434\u0438\u043D\u043E\u0432 \u0420\u0430\u0448\u0438\u0442 \u0420\u0430\u0444\u0430\u0438\u043B\u043E\u0432\u0438\u0447',
        '\u0410\u0431\u0435\u043D\u043E\u0432 \u0416\u0430\u043D\u0430\u0439 \u0410\u043A\u043F\u0430\u043D\u0431\u0430\u0435\u0432\u0438\u0447',
        '\u041D\u0430\u0443\u0448\u0435\u043D\u043E\u0432 \u0420\u0438\u043D\u0430\u0442 \u0411\u043E\u043B\u0430\u0442\u043E\u0432\u0438\u0447',
        '\u0411\u0443\u043A\u0435\u043D\u043E\u0432 \u0411\u0435\u0439\u0431\u0443\u0442 \u0420\u0430\u0438\u0436\u0430\u043D\u043E\u0432\u0438\u0447',
        '\u041C\u044B\u0440\u0437\u0430\u0431\u0435\u043A\u043E\u0432 \u041D\u0443\u0440\u0438\u0434\u0438\u043D \u0428\u0435\u0440\u0435\u0445\u0430\u043D\u043E\u0432\u0438\u0447 \u0414\u041A\u0425\u041E',
        '\u0411\u0435\u043A\u0431\u0430\u0435\u0432 \u0411\u0435\u043A\u0437\u0430\u0442 \u041A\u0430\u043B\u0438\u0443\u043B\u044B \u0414\u041A\u0425\u041E',
        '\u0411\u0443\u0445\u0430\u043D\u043E\u0432 \u0411\u0430\u0443\u0440\u0436\u0430\u043D \u0423\u0440\u0430\u0437\u0431\u0435\u043A\u043E\u0432\u0438\u0447 \u0414\u041A\u0425\u041E',
        '\u0423\u0442\u0435\u0433\u0435\u043D\u043E\u0432 \u041A\u0443\u0440\u043C\u0430\u043D\u0430\u043B\u0438 \u0422\u0430\u043D\u0438\u0440\u0431\u0435\u0440\u0433\u0435\u043D\u043E\u0432\u0438\u0447 \u0414\u041A\u0425\u041E',
        '\u0421\u043C\u0438\u0440\u043D\u043E\u0432 \u0421\u0435\u0440\u0433\u0435\u0439 \u0412\u0438\u043A\u0442\u043E\u0440\u043E\u0432\u0438\u0447 - \u0414\u043D\u0435\u0432\u043D\u043E\u0439 \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u043A'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::elektrik.elektrik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::elektrik.elektrik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiErnarAndTimurErnarAndTimur extends Schema.CollectionType {
  collectionName: 'ernar_and_timurs';
  info: {
    singularName: 'ernar-and-timur';
    pluralName: 'ernar-and-timurs';
    displayName: '\u0415\u0440\u043D\u0430\u0440 \u0438 \u0416\u0430\u043D\u0434\u043E\u0441';
    description: '';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    ourComment: Attribute.Text;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'C'>;
    ProgressData: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ernar-and-timur.ernar-and-timur',
      'oneToOne',
      'admin::user'
    >;
    updatedBy: Attribute.Relation<
      'api::ernar-and-timur.ernar-and-timur',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiKartridzhiKartridzhi extends Schema.CollectionType {
  collectionName: 'kartridzhis';
  info: {
    singularName: 'kartridzhi';
    pluralName: 'kartridzhis';
    displayName: '\u043A\u0430\u0440\u0442\u0440\u0438\u0434\u0436\u0438';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    userName: Attribute.String;
    userSurname: Attribute.String;
    userSide: Attribute.String;
    cardModel: Attribute.String;
    userMail: Attribute.Email;
    userSign: Attribute.Media;
    cardCount: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kartridzhi.kartridzhi',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kartridzhi.kartridzhi',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKuatKuat extends Schema.CollectionType {
  collectionName: 'kuats';
  info: {
    singularName: 'kuat';
    pluralName: 'kuats';
    displayName: '\u041A\u0443\u0430\u0442 - \u043A\u0430\u043C\u0435\u0440\u044B \u0432\u0438\u0434\u0435\u043E\u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u044F';
    description: '';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    ourComment: Attribute.Text;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'C'>;
    ProgressData: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::kuat.kuat', 'oneToOne', 'admin::user'>;
    updatedBy: Attribute.Relation<'api::kuat.kuat', 'oneToOne', 'admin::user'>;
  };
}

export interface ApiPlotnikPlotnik extends Schema.CollectionType {
  collectionName: 'plotniks';
  info: {
    singularName: 'plotnik';
    pluralName: 'plotniks';
    displayName: '\u0412\u0435\u043D\u0442\u0438\u043B\u044F\u0446\u0438\u044F';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043C\u043E ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    >;
    OurComment: Attribute.Text;
    executor: Attribute.Enumeration<['test', 'test1', 'test2']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plotnik.plotnik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plotnik.plotnik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRustamRustam extends Schema.CollectionType {
  collectionName: 'rustams';
  info: {
    singularName: 'rustam';
    pluralName: 'rustams';
    displayName: '\u0420\u0443\u0441\u0442\u0430\u043C';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    >;
    ourComment: Attribute.Text;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'C'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::rustam.rustam',
      'oneToOne',
      'admin::user'
    >;
    updatedBy: Attribute.Relation<
      'api::rustam.rustam',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiSaidSaid extends Schema.CollectionType {
  collectionName: 'saids';
  info: {
    singularName: 'said';
    pluralName: 'saids';
    displayName: '\u0421\u0430\u0438\u0434';
    description: '';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    ourComment: Attribute.Text;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'C'>;
    ProgressData: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::said.said', 'oneToOne', 'admin::user'>;
    updatedBy: Attribute.Relation<'api::said.said', 'oneToOne', 'admin::user'>;
  };
}

export interface ApiSantehnikSantehnik extends Schema.CollectionType {
  collectionName: 'santehniks';
  info: {
    singularName: 'santehnik';
    pluralName: 'santehniks';
    displayName: '\u0421\u0430\u043D\u0442\u0435\u0445\u043D\u0438\u043A';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043C\u043E ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    OurComment: Attribute.Text;
    executor: Attribute.Enumeration<
      [
        '\u041A\u0438\u043A\u0430\u044F\u0442 \u041A\u0430\u043B\u0438\u0430\u0441\u043A\u0430\u0440',
        '\u041A\u0430\u0437 \u041C\u0443\u0445\u0430\u043D\u0431\u0435\u043A',
        '\u0428\u0435\u0440\u043C\u0430\u0433\u0430\u043D\u0431\u0435\u0442\u043E\u0432 \u0410\u0431\u0438\u043B\u044C \u0410\u0439\u043C\u0443\u0440\u0430\u0442\u043E\u0432\u0438\u0447',
        '\u0421\u0443\u043F\u0435\u043A\u043E\u0432 \u0415\u0440\u0431\u043E\u043B \u0415\u043B\u044C\u0442\u0430\u0435\u0432\u0438\u0447',
        '\u0410\u0431\u0438\u043B\u0434\u0438\u043D\u043E\u0432 \u0416\u0443\u043C\u0430\u0434\u0438\u043B\u0434\u0430 \u041A\u0430\u0440\u0442\u0430\u0435\u0432\u0438\u0447 \u0414\u041A\u0425\u041E',
        '\u0411\u043E\u043B\u0435\u0433\u0435\u043D\u043E\u0432 \u0421\u0430\u043A\u0430\u043F\u0431\u0435\u0440\u0433\u0435\u043D \u041D\u041D\u041C\u0426'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::santehnik.santehnik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::santehnik.santehnik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSkudZaprosyHelpDeskSkudZaprosyHelpDesk
  extends Schema.CollectionType {
  collectionName: 'skud_zaprosy_help_desks';
  info: {
    singularName: 'skud-zaprosy-help-desk';
    pluralName: 'skud-zaprosy-help-desks';
    displayName: '\u0441\u043A\u0443\u0434 - \u0441\u0438\u043C\u0431\u044D\u0439\u0441 -  \u0437\u0430\u043F\u0440\u043E\u0441\u044B HelpDesk';
    description: '';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    ourComment: Attribute.Text;
    complexity: Attribute.Enumeration<['A', 'B', 'C']> &
      Attribute.DefaultTo<'C'>;
    ProgressData: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::skud-zaprosy-help-desk.skud-zaprosy-help-desk',
      'oneToOne',
      'admin::user'
    >;
    updatedBy: Attribute.Relation<
      'api::skud-zaprosy-help-desk.skud-zaprosy-help-desk',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiTekstDlyaDokumentaQrTekstDlyaDokumentaQr
  extends Schema.CollectionType {
  collectionName: 'tekst_dlya_dokumenta_qrs';
  info: {
    singularName: 'tekst-dlya-dokumenta-qr';
    pluralName: 'tekst-dlya-dokumenta-qrs';
    displayName: '\u0422\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 qr';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mainText: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tekst-dlya-dokumenta-qr.tekst-dlya-dokumenta-qr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tekst-dlya-dokumenta-qr.tekst-dlya-dokumenta-qr',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVentilyaczionshhikVentilyaczionshhik
  extends Schema.CollectionType {
  collectionName: 'ventilyaczionshhiks';
  info: {
    singularName: 'ventilyaczionshhik';
    pluralName: 'ventilyaczionshhiks';
    displayName: '\u0412\u0435\u043D\u0442\u0438\u043B\u044F\u0446\u0438\u043E\u043D\u0449\u0438\u043A';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    userName: Attribute.String;
    userPhone: Attribute.String;
    userSide: Attribute.String;
    userComment: Attribute.Text;
    userQuery: Attribute.String;
    Progress: Attribute.Enumeration<
      [
        '\u0421\u0434\u0435\u043B\u0430\u043D\u043E',
        '\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430',
        '\u043D\u0435\u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043C\u043E ',
        '\u0432 \u0440\u0430\u0431\u043E\u0442\u0435'
      ]
    > &
      Attribute.DefaultTo<'\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430'>;
    OurComment: Attribute.Text;
    executor: Attribute.Enumeration<
      [
        '\u0410\u043F\u043F\u0430\u0441\u043E\u0432 \u041D\u0443\u0440\u043B\u0430\u043D \u0421\u0435\u0440\u0438\u043A\u0436\u0430\u043D\u043E\u0432\u0438\u0447',
        '\u0421\u0430\u0433\u0438\u043D\u0434\u044B\u043A\u043E\u0432 \u0411\u0435\u0440\u0438\u043A \u0421\u0443\u043B\u0442\u0430\u043D\u043E\u0432\u0438\u0447',
        '\u0420\u044B\u043A\u043E\u0432 \u0412\u0438\u0442\u0430\u043B\u0438\u0439 \u0410\u043B\u0435\u043A\u0441\u0435\u0435\u0432\u0438\u0447',
        '\u0411\u043E\u0448\u0430\u043D\u043E\u0432 \u0415\u0440\u0431\u043E\u043B \u0416\u043E\u043B\u0442\u0430\u0435\u0432\u0438\u0447'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ventilyaczionshhik.ventilyaczionshhik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ventilyaczionshhik.ventilyaczionshhik',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::graphs-builder.graph': PluginGraphsBuilderGraph;
      'api::aidar.aidar': ApiAidarAidar;
      'api::bahador.bahador': ApiBahadorBahador;
      'api::elektrik.elektrik': ApiElektrikElektrik;
      'api::ernar-and-timur.ernar-and-timur': ApiErnarAndTimurErnarAndTimur;
      'api::kartridzhi.kartridzhi': ApiKartridzhiKartridzhi;
      'api::kuat.kuat': ApiKuatKuat;
      'api::plotnik.plotnik': ApiPlotnikPlotnik;
      'api::rustam.rustam': ApiRustamRustam;
      'api::said.said': ApiSaidSaid;
      'api::santehnik.santehnik': ApiSantehnikSantehnik;
      'api::skud-zaprosy-help-desk.skud-zaprosy-help-desk': ApiSkudZaprosyHelpDeskSkudZaprosyHelpDesk;
      'api::tekst-dlya-dokumenta-qr.tekst-dlya-dokumenta-qr': ApiTekstDlyaDokumentaQrTekstDlyaDokumentaQr;
      'api::ventilyaczionshhik.ventilyaczionshhik': ApiVentilyaczionshhikVentilyaczionshhik;
    }
  }
}
