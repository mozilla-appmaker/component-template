(function () {
  var buttonElement;
  var iframeHandler;

  beforeEach(function (done) {
    iframeHandler = harnessUtils.createIframe('test/html/test.html', function (win, doc) {
      buttonElement = iframeHandler.document.querySelector('ceci-button');
      done();
    });
  });

  describe('Ceci Button', function () {
    test('Sanity check', function (done) {
      chai.assert(buttonElement.ceci, 'Ceci descriptor exists.');
      iframeHandler.runIframeTest('Sanity Check', done);
    });

    test('Broadcasts', function (done) {
      iframeHandler.testBroadcasts(buttonElement, done, {
        check: {
          click: function (e, channel) {
            chai.assert.equal(e.detail.data, 'you must construct additional pylons', 'Component attached correct value to event.');
            chai.assert.equal(e.detail.data, buttonElement.getAttribute('value'), 'Correct component broadcasted ' + channel + ' event.');
          }
        },
        execute: {
          click: function (channel) {
            var e = iframeHandler.document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
            buttonElement.$.button.dispatchEvent(e);
          }
        }
      });
    });

    test('Listeners', function (done) {
      iframeHandler.testListeners(buttonElement, done, {
        check: {
          click: function (e, channel) {
            chai.assert(true, 'Click event occured.');
          },
          setLabel: function (e, channel) {
            chai.assert(true);
          }
        }
      });
    });
  });
})();
