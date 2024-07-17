import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Import setupListeners
import { authApi } from './services/auth';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add authApi.middleware here
});

setupListeners(store.dispatch); // Add this line to enable API request lifecycle events

export default store;
