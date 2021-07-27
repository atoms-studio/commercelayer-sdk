module.exports = {
  base: '/commercelayer-sdk/',
  lang: 'en-US',
  title: 'Commercelayer SDK',
  description: 'A lightweight, opinionated CommerceLayer SDK built for fast delivery of e-commerce functionalities..',

  themeConfig: {
    editLinks: false,
    lastUpdated: false,

    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'API Reference',
        link: '/api/init',
        activeMatch: '^/api/'
      },
      {
        text: 'Github',
        link: 'https://github.com/atoms-studio/commercelayer-sdk',
      },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: 'Getting Started',
      children: [
        { text: 'Introduction', link: '/' },
        { text: 'Quick start', link: '/guide/quick-start' },
      ]
    },
    {
      text: 'Concepts',
      children: [
        { text: 'Initialization', link: '/guide/concepts/initialization' },
        { text: 'Authentication', link: '/guide/concepts/authentication' },
        { text: 'Fetching resources', link: '/guide/concepts/fetching-resources' },
        { text: 'Creating resources', link: '/guide/concepts/creating-resources' },
        { text: 'Updating resources', link: '/guide/concepts/updating-resources' },
        { text: 'Deleting resources', link: '/guide/concepts/deleting-resources' },
      ]
    },
  ]
}

function getApiSidebar() {
  return [
    {
      text: 'Initialization API',
      link: '/api/init',
    },
    {
      text: 'Authentication API',
      children: [
        { text: 'setMarket', link: '/api/auth/set-market' },
        { text: 'getMarket', link: '/api/auth/get-market' },
        { text: 'getScope', link: '/api/auth/get-scope' },
        { text: 'getToken', link: '/api/auth/get-token' },
        { text: 'loginAsCustomer', link: '/api/auth/login-as-customer' },
        { text: 'isCustomerLoggedIn', link: '/api/auth/is-customer-logged-in' },
        { text: 'getProfile', link: '/api/auth/get-profile' },
        { text: 'loadProfile', link: '/api/auth/load-profile' },
        { text: 'logoutCustomer', link: '/api/auth/logout-customer' },
        { text: 'getCustomerToken', link: '/api/auth/get-customer-token' },
        { text: 'useCustomerSession', link: '/api/auth/use-customer-session' },
        { text: 'loginAsIntegration', link: '/api/auth/login-as-integration' },
      ]
    },
    {
      text: 'Resource API',
      children: [
        { text: 'find', link: '/api/find' },
        { text: 'findAll', link: '/api/find-all' },
        { text: 'findBy', link: '/api/find-by' },
        { text: 'create', link: '/api/create' },
        { text: 'update', link: '/api/update' },
        { text: 'delete', link: '/api/delete' },
      ]
    }
  ]
}
