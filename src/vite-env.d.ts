/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string | boolean>> {
  /**
   * # API地址
   */
  VITE_API_URL: string
}
