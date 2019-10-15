// Started to implement "twilio" to send the user a text message.
// Currently, it just sends a text to me when this file is run with my enviroment variables. 
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

client.messages
  .create({
     body: 'This is a test/text message.',
     from: '+13344012509',
     to: '+16159251981'
   })
  .then(message => console.log(message.sid));