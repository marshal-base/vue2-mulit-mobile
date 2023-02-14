const glob = require('glob')

const PRODUCE_NAME = process.env.PRODUCT_NAME || ''
const SERVER_ENV_IS_PRD = process.env.SERVER_ENV === 'prd'
let pages = null

function getCdnPublicPath() {
  let cdnPublicPath = `/${PRODUCE_NAME}/`

  if (SERVER_ENV_IS_PRD) {
    cdnPublicPath = `//cnd.company.com/h5/${PRODUCE_NAME}/`
  }

  return cdnPublicPath
}

function getEntry(globPath) {
  let entries = {}
  glob.sync(globPath).forEach((entry) => {
    var tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
      filename: (PRODUCE_NAME ? 'index' : tmp[1]) + '.html',
      version: getVersion(),
      cdn: {
        css: [],
        js: [
          'https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.0/vconsole.min.js'
        ]
      }
    }
  })

  return entries
}

pages = getEntry(`src/entry/${PRODUCE_NAME || '**?'}/*.html`)

module.exports = {
  publicPath: getCdnPublicPath(),
  pages,
  outputDir: `dist/${PRODUCE_NAME}`,
  assetsDir: 'static',
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'error' : false,
      maxEntrypointSize: 409600, // 400kb * 1024 = 409600 字节
      maxAssetSize: 409600, // 400kb * 1024 = 409600 字节
      assetFilter: assetFilename => assetFilename.endsWith('.js')
    }
  },
  devServer: {
    proxy: {
      '/mock/template': {
        target: 'http://rap2api.taobao.org/app/mock/template/'
      }
    }
  },
  chainWebpack: config => {
    // 提取公共资源，并使用cdn加载
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        'babel-polyfill': 'window',
        'fastclick': 'FastClick',
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
      })
    }

    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}

function getVersion() {
  let date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset()) // toJSON 的时区补偿
  return date.toJSON().substr(0, 19).replace(/[-T:]/g, '')
}
