module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  overrides: [
    {
      // ไฟล์ config ทำงานบน Node.js จึงต้องมี globals ของ Node
      files: ['*.config.js', '*.config.cjs', 'postcss.config.js'],
      env: { node: true },
    },
  ],
  rules: {
    // โปรเจกต์ใช้ JSX ล้วนไม่มี PropTypes/TypeScript จึงไม่ต้องตรวจ prop-types
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
