const { DocumentBuilder } = require('./builder');

function build(config) {
    const builder = new DocumentBuilder(config);
    return builder.build();
}

module.exports = { build };