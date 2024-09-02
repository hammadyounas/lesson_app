"use client";
import "./globals.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux/store'; // Ensure this path is correct


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </PersistGate>
    </Provider>
  );
}
// 'use client';

// import "./globals.css";
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from '../redux/store'; // Ensure this path is correct


// export default function RootLayout({ children }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }
