const c = require('crypto')

const secret = 'duHastAlleFlaggenGefunden';
const hash = c.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');

console.log(hash);
