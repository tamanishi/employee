require('dotenv').config();
var cheerio = require('cheerio-httpcli');

var basicID = process.env.com_basic_id;
var basicPW = process.env.com_basic_pw;
var siteID = process.env.site_id;
var sitePW = process.env.site_pw;
var loginURL = process.env.login_url;
var mailURL = process.env.mail_url;

cheerio.headers['Authorization'] = 'Basic ' + new Buffer(basicID + ':' + basicPW).toString('base64');
cheerio.fetch(loginURL)
.then( function (result) {

  var loginInfo = {
    PuID: siteID,
    CuPassword: sitePW
  };

  result.$('form[name=form1]').submit(loginInfo, function (err, $, res, body) {
    cheerio.fetch(mailURL, function (err, $, res, body) {
      $('td[width="100"]').children('font:not(:has(a))').each( function (idx) {
        if (parseInt($(this).text().charCodeAt(0), 10) === 160) {
          return;
        } else {
          console.log(($(this).text()).replace('　', '').replace(' ', ''));
        }
      });
    });
  });
});
