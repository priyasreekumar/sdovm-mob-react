import PublicClientApplication from 'react-native-msal';

const config = {
  auth: {
    clientId: 'bbd9d791-b875-438c-aa95-9162cc0d9c1c',
    authority:
      'https://login.microsoftonline.com/b7f604a0-00a9-4188-9248-42f3a5aac2e9',
  },
};

export const params = {
  scopes: [
    'api://WhereismyorderSDOVS-Dev/wmo',
  ],
};

export const pca = new PublicClientApplication(config);

export const acquireTokenSilent = () => pca.acquireTokenSilent(params);
