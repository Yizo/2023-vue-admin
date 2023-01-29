import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// @ts-ignore
import path from 'path'
// @ts-ignore
export default ({ mode}) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd())
    console.group('icon')
    console.log(path.resolve("./packages/SvgIcon/icons/svg"))
    console.groupEnd()
  // @ts-ignore
  return defineConfig({
    base: env.VITE_APP_PUBLIC_PATH,
    build: {
      outDir: 'docs'
    },
    resolve: {
      alias: {
        // @ts-ignore
        '@': path.resolve(__dirname, 'src'),
        vue: 'vue/dist/vue.esm-bundler.js'
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css']
    },
    css: {
        // postcss:{
        //     plugins: [
        //       require('autoprefixer')({
        //           overrideBrowserslist: ['last 2 versions', 'not ie > 0']
        //       })
        //     ],
        // },
      preprocessorOptions: {
          less: {
              javascriptEnabled: true,
              additionalData: `@import "@gm/styles/index.less";`
          }
      }
    },
    plugins: [
        vue(),
        Components({
          resolvers: [AntDesignVueResolver({
              importStyle: false
          })],
        }),
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), "./src/SvgIcon/icons/svg")],
          symbolId: 'icon-[name]'
        }),
    ],
    server: {
        host: true,
        proxy: {
                [`${env.VITE_APP_BASE_URL}/`]: {
                target: 'http://192.168.31.174:3000/',
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_URL}`), '')
            }
        }
    }
  })
}