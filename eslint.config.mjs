import antfu from '@antfu/eslint-config'

export default antfu(
  // 基础选项（全局）
  {
    type: 'app',
    // 项目使用纯 JS/TS + Node，不需要 React/Svelte 等框架支持
    react: false,
    svelte: false,
    vue: false,
    astro: false,
    solid: false,

    // 代码风格：2 空格缩进、单引号、无分号（antfu 默认风格，显式声明便于以后调整）
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },

    // 忽略目录
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.git/**',
      'content/**',
      'docs/**',
    ],
  },

  // 针对 experiments/ 学习代码的规则放行
  // 学习 demo 中大量使用 console.log 调试输出、直接使用全局 Buffer，属预期行为
  {
    files: ['experiments/**/*.ts', 'experiments/**/*.js'],
    rules: {
      'no-console': 'off',
      'node/prefer-global/buffer': 'off',
      // 实验代码允许 `let offset` 等先声明后赋值的写法
      'ts/no-unused-vars': 'warn',
    },
  },
)
