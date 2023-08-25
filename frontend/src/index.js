import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from "./Store/index";
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider} from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={"dev-njkobron24ht6pvm.us.auth0.com"}
    clientId={"qCnIxFVsRjkfhqflXoCE5iyDzj8RC37L"}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);


