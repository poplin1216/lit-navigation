import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  if (isLib) {
    return {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'LitNavigation',
          fileName: (format) => `lit-navigation.${format === 'es' ? 'js' : 'umd.cjs'}`,
        },
        rollupOptions: {
          // lit 패키지는 외부 의존성(peer dependency)으로 두어 라이브러리 용량을 최소화합니다.
          external: ['lit', /^lit\/.*/],
          output: {
            globals: {
              lit: 'Lit',
            },
          },
        },
        outDir: 'dist',
        emptyOutDir: true,
      },
      plugins: [
        dts({
          insertTypesEntry: true,
          outDir: 'dist/types',
        }),
      ],
    };
  }

  // 데모 웹 앱 빌드 및 로컬 개발용(dev) 설정
  return {
    build: {
      outDir: 'dist-demo',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
    },
  };
});
