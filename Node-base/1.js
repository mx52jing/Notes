// console.log(this, global)

// ;(function () {
//     console.log(this, Object.keys(this))
// })()

// console.log(process.argv)

// console.log(process.env)

const path = require('path')

const xxx = path.format({
    root: '/a',
    dir: '/b',
    base: 'c.txt'
})

console.log(xxx)

console.log(path.normalize('/foo/bar//baz/asdf/quux/..'))