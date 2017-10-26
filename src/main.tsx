import { h, render } from 'preact'

declare const FuseBox: any
declare const require: any
declare const process: any

let elem: any
let App: any

const bootstrap = () => {
  App = require('~/index').App
  elem = render(<App />, document.getElementById('root'), elem)
}

bootstrap()

if (process.env.NODE_ENV !== 'production') {
  FuseBox.addPlugin({
    hmrUpdate: () => bootstrap(),
  })
}
