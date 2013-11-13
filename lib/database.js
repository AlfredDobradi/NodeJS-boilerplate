module.exports = function() {
    var mongoose = require('mongoose');
    
    var config = require('./config').db;
    var hosts = '';
    for (var i in config.hosts) {
        hosts = hosts + ',mongodb://' + config.hosts[i] + '/' +config.database;
    }
    hosts = hosts.substr(1);
    
    mongoose.connect(hosts,{
        db: {
            w: 'majority'
        },
        replSet: {
            rs_name: config.replicaSet,
            readPreference: 'nearest'
        },
        user: config.user,
        pass: config.pwd
    });

    
    return mongoose;
};