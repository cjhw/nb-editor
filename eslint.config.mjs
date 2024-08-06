import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'node/prefer-global/process': 'off',
    'no-consdfdfole': 'off',
    'ts/consistent-type-imports': 'off',
    'style/comma-dangle': 'off',
    'style/brace-style': 'off',
    'antfu/if-newline': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'no-console': 'off',
  },
  ignores: ['**/dist/**', '**/node_modules/**'],
})
