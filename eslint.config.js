import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        jsx: true
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      'prettier': pluginPrettier
    },
    rules: {
      // 自定义规则
      'prettier/prettier': ['error', {
        singleQuote: true,
        semi: false,
        printWidth: 80,
        trailingComma: 'none',
        endOfLine: 'auto'
      }],
      'vue/multi-word-component-names': ['warn', {
        ignores: ['index']
      }],
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]