'use strict';

exports.values = function(req, res) {
    setTimeout(function() {
        return res.json(['value1', 'value2']);
    }, 4000);

};