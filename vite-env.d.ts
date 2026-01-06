/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_PORT?: string;
  readonly VITE_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
