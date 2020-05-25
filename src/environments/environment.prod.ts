require('dotenv').config();

export const environment = {
  production: true,  
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: 'portfolio-a2a27.firebaseapp.com',
    databaseURL: 'https://portfolio-a2a27.firebaseio.com',
    projectId: 'portfolio-a2a27',
    storageBucket: 'portfolio-a2a27.appspot.com',
    messagingSenderId: '557484265366',
    appId: '1:557484265366:web:6f66de99e8471d3b0e17b7',
    measurementId: 'G-MCR3RFJ303'
  }
};
