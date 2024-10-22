"use client";
import "./globals.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux/store'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ToastContainer // Add ToastContainer here
              position="top-right" // or bottom-right, top-center etc
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          {children}
        </PersistGate>
      </Provider>
    </body>
  </html>
  );
}