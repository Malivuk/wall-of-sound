'use strict';

const mailconf = require('./config');
const nodemailer = require('nodemailer');
const sanitizeUrl = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const buildApiResponse = (code, body) => {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};

module.exports.sendemail = (event, context, callback) => {
  const url = sanitizeUrl(JSON.parse(event.body).url);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailconf.DEST_EMAIL,
      pass: mailconf.APP_PASSWD
    }
  });

  let mailOptions = {
    from: '"Usampl App" ' + mailconf.DEST_EMAIL + ' "',
    to: mailconf.DEST_EMAIL,
    subject: '[Usampl] suggestion de sample',
    text: 'Hello, une nouvelle suggestion de sample vient d\'arriver: ' + url + ' one luv 🐯',
    html: 'Hello,<br/><br/>Une nouvelle suggestion de sample vient d\'arriver:<br/> ' + url + '<br/><br/>One luv 🐯',
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    error ? callback(null, buildApiResponse(400, {}))
          : callback(null, buildApiResponse(200, {}))
  });
};
