/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var URL = require('url-parse');
function getContents(url, token, callback) {
    var headers = {
        'user-agent': 'nodejs'
    };
    if (token) {
        headers['Authorization'] = 'token ' + token;
    }
    var parsedUrl = new URL(url);
    var options = {
        url: url,
        headers: headers
    };
    if (process.env.npm_config_strict_ssl === 'false') {
        options.strictSSL = false;
    }
    if (process.env.npm_config_proxy && parsedUrl.protocol === 'http:') {
        options.proxy = process.env.npm_config_proxy;
    }
    if (process.env.npm_config_https_proxy && parsedUrl.protocol === 'https:') {
        options.proxy = process.env.npm_config_https_proxy;
    }
    request.get(options, function (error, response, body) {
        if (!error && response && response.statusCode >= 400) {
            error = new Error('Request returned status code: ' + response.statusCode + '\nDetails: ' + response.body);
        }
        callback(error, body);
    });
}
exports.getContents = getContents;
