import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'feriatech-8ed7f',
        appId: "1:76416749403:web:ccd34b0f03f1cd5946547e",
        storageBucket: "feriatech-8ed7f.appspot.com",
        apiKey: "AIzaSyA2N_Zf1APICaK7mhyr7nf1Nd7xkaq_LhY",
        authDomain: "feriatech-8ed7f.firebaseapp.com",
        messagingSenderId: "76416749403",
      })
    ),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), provideAnimationsAsync()
  ]
};

