export IS_JENKINS=true
 
node --version
npm --version
google-chrome --version
 
cd test_jenkins
npm install
npm run e2e protractor.conf.js