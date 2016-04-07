// phantomjs --ssl-protocol=TLSv1 screenshot.js /tmp
var page = require('webpage').create(),
  system = require('system');
  
if (system.args.length === 1) {
  console.log('Usage: screenshot.js <directory for screenshots>');
  phantom.exit();
}

dir = system.args[1];

page.viewportSize = { width: 1080, height: 1920 };

page.open('https://www.kurmis.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render( dir + '/www.kurmis.com.png');
  }
  phantom.exit();
});
