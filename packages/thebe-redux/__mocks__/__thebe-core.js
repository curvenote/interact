const messaging = require('thebe-core/dist/cjs/messaging');
const ThebeServer = require('thebe-core/dist/cjs/server');

module.exports = {
    setupThebeCore: () => {},
    ...messaging,
    ThebeServer
};