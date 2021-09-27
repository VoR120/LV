const route = (app) => {
    app.use('/partycell', require('./partyCellRouter'))
    app.use('/', require('./authRoute'))
}

module.exports = route;