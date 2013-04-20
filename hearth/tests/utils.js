(function() {
var a = require('assert');
var assert = a.assert;
var eq_ = a.eq_;
var feq_ = a.feq_;

var utils = require('utils');

test('String strip', function(done) {
    eq_(('  a s d  f   ').strip(), 'asdf');
    done();
});

test('_pd', function(done) {
    var ev = {preventDefault: done};
    utils._pd(function() {})(ev);
});

test('escape_', function(done) {
    eq_(utils.escape_('<b> & "\'<'), '&lt;b&gt; &amp; &#34;&#39;&lt;');
    done();
});

test('fieldFocused', function(done) {
    eq_(utils.fieldFocused({target: {nodeName: 'input'}}), true);
    eq_(utils.fieldFocused({target: {nodeName: 'bgsound'}}), false);
    done();
});

test('baseurl', function(done) {
    eq_(utils.baseurl('http://foo/bar?asdf/asdf'), 'http://foo/bar');
    eq_(utils.baseurl('http://foo/bar/?asdf/asdf'), 'http://foo/bar/');
    done();
});

test('urlparams', function(done) {
    eq_(utils.urlparams('', {a: 'b'}), '?a=b');
    eq_(utils.urlparams('?', {a: 'b'}), '?a=b');
    eq_(utils.urlparams('?', {a: ' '}), '?a=%20');
    eq_(utils.urlparams('?a=d', {a: 'b'}), '?a=b');
    eq_(utils.urlparams('?', {__keywords: true}), '?');
    done();
});

test('getVars', function(done) {
    feq_(utils.getVars('a=b'), {a: 'b'});
    feq_(utils.getVars('a%20z=b%20c'), {'a z': 'b c'});
    feq_(utils.getVars('a+z=b+c'), {'a z': 'b c'});
    feq_(utils.getVars('?a=b'), {a: 'b'});
    feq_(utils.getVars('?'), {});
    feq_(utils.getVars('?a=b&c=d'), {a: 'b', c: 'd'});
    // Test that there's not weird HTML encoding going on.
    feq_(utils.getVars('%3C%3E%22\'%26=%3C%3E%22\'%26'),
         {'<>"\'&': '<>"\'&'});
    done();
});

})();
