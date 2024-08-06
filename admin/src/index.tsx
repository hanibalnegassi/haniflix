import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import './index.css'
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { Provider } from 'react-redux';
import store, { persistor } from 'src/store';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
);

serviceWorker.unregister();
