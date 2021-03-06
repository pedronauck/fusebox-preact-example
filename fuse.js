const {
  FuseBox,
  BabelPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  EnvPlugin,
  Sparky,
} = require('fuse-box')

let fuse
let app
let vendor

Sparky.task('config', () => {
  fuse = new FuseBox({
    homeDir: `src/`,
    target: 'browser',
    output: 'dist/$name.js',
    useTypescriptCompiler: true,
    experimentalFeatures: true,
    plugins: [
      EnvPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
      BabelPlugin({
        config: {
          plugins: [
            ["transform-react-jsx", { pragma: "h" }],
          ],
        },
      }),
      WebIndexPlugin({
        title: 'FuseBox Preact',
        template: 'src/index.html',
      })
    ],
  })

  vendor = fuse
    .bundle('vendor')
    .instructions(`~ main.tsx`)

  app = fuse
    .bundle('app')
    .instructions(`!> [main.tsx]`)
})

Sparky.task('clean', () => Sparky.src('dist').clean('dist'))
Sparky.task('build', ['clean', 'config'], () => fuse.run())

Sparky.task('default', ['clean', 'config'], () => {
  fuse.dev({ port: 3000 })

  vendor.watch()
  app.hmr().watch()

  return fuse.run()
})
