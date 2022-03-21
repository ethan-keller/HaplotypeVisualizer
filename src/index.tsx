import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import SpinnerAnnotated from './components/SpinnerAnnotated';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<SpinnerAnnotated message={'Loading persistence'} />}
        persistor={persistor}
      >
        <AppRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
