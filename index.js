var jsx = require('jsx-transform');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var sourceFilename = loaderUtils.getRemainingRequest(this);
  var current = loaderUtils.getCurrentRequest(this);
  var query = loaderUtils.parseQuery(this.query);
  
  if (query.docblock) 
    docblock = '/** @jsx ' + query.docblock + ' */\n';
  else
    docblock = '/** @jsx h */\n';

  source = docblock + source;

  var transform = jsx.transform(source, {});
  transform = transform.replace(docblock,"")
  this.callback(null, transform, null);
};