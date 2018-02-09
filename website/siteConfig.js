/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  
];

const siteConfig = {
  title: 'Caravaggio' /* title for your website */,
  tagline: 'A blazing fast ⚡ image manipulation service',
  url: 'https://caravaggio.gitlab.io' /* your website url */,
  baseUrl: '/caravaggio/' /* base url for your project */,
  projectName: 'caravaggio',
  headerLinks: [
    {doc: 'docs', label: 'Docs'},
    // {page: 'help', label: 'Help'},
    // {blog: true, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/caravaggio-logo.jpeg',
  footerIcon: 'img/caravaggio-logo.jpeg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#4ABDAC',
    // primaryColor: '#000115',
    secondaryColor: '#FC4A1A',
    // secondaryColor: '#205C3B',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'Made with 💚 by Fabrizio Ruggeri @ ramielcreations',
  organizationName: 'ramielcreations', // or set an env variable ORGANIZATION_NAME
  projectName: 'caravaggio', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://gitlab.com/ramiel/caravaggio',
  customDocsPath: 'website/docs'
};

module.exports = siteConfig;