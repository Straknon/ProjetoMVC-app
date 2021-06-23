//When run webpack, need to pass environment by: --env prod or dev. example: webpack --env prod

module.exports = (env) => {
    return require(`./config/webpack.${env}.js`)
}