const route = (app) => {
    app.use('/api', require('./partyMemberRoute'));
    app.use('/api', require('./partyCellRoute'));
    app.use('/api', require('./fLanguageRoute'));
    app.use('/api', require('./fLanguageLevelRoute'));
    app.use('/api', require('./termRoute'));
    app.use('/api', require('./positionRoute'));
    app.use('/api', require('./positionPMRoute'));
    app.use('/api', require('./religionRoute'));
    app.use('/api', require('./ethnicRoute'));
    app.use('/api', require('./itRoute'));
    app.use('/api', require('./politicsRoute'));
    app.use('/api', require('./fLpMRoute'));
    app.use('/api', require('./permissionRoute'));
    app.use('/api', require('./permissionPMRoute'));
    app.use('/api', require('./gradeRoute'));
    app.use('/api', require('./moveRoute'));
    app.use('/api', require('./rewardRoute'));
    app.use('/api', require('./disciplineRoute'));
    app.use('/api', require('./typeRoute'));
    app.use('/auth/', require('./authRoute'));
}

module.exports = route;