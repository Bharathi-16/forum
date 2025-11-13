// src/environments/environment.ts
import type { Environment } from "./environment.model";


export const environment: Environment = {
    production: false,
    name: 'local',
    version: '20250319.01',
    // You can leave this empty or use a local API endpoint:
    // apiBaseUrl : 'https://65h5fmmu0c.execute-api.us-east-1.amazonaws.com/llcDev',
    wsBaseUrl: 'http://localhost:8080/ws' ,// <<-- ADD THIS LINE
    apiBaseUrl : 'http://localhost:8080/' ,
    defaultBlobUrl: '',
    // geminiApiKey:'AIzaSyB2Gu5A1PyDlueUp7DiWB8Ozu2B8G-CVQY'
    // maxOwners: 4,
  };

