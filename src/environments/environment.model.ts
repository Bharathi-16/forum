// src/environments/environment.model.ts

export interface Environment {
    // These properties match the type the compiler is complaining about:
    production: boolean;
    name: string;
    version: string;
    apiBaseUrl: string;
    defaultBlobUrl: string;
    
    // ✅ THIS IS THE REQUIRED FIX
    wsBaseUrl: string; 
    
    // Add any other properties you are using (optional or otherwise)
    // geminiApiKey?: string;
    // maxOwners?: number;
}