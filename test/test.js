const assert = require('assert');
const t = require('../index');
const daskeyboardModule = require('daskeyboard-applet');

describe('WorkOut', () => {
  let app = new t.WorkOut();
  
  describe('#run()', () => {

    it('should blink in green at the moment desired', async function () {
      // build the app and configure it to trigger every hour at :55
      const config = {
        applet: {
          user: {
            minuteAfterTheHour: 55,
            Pushups: true,
            userChoosenValue: "sequential"
          }
        }
      }
      return buildAppWithConfig(config).then(app => {
        // Simulate that this test runs at 13:55
        app.getCurrentHour = function () {
          return 14;
        }

        app.getCurrentMinute = function () {
          return 55;
        }
        return app.run().then(signal => {
          // assert signal received
          assert.ok(signal);
          // assert color of first point is green
          assert.equal(signal.points[0][0].color,'#19FF00');
          // assert blinking
          assert.equal(signal.points[0][0].effect,daskeyboardModule.Effects.BLINK);
          
        })
      }).catch(err => {
        assert.fail(err);
      });
    });
  });
});

/**
 * Builds the app with the config given in params
 * @param {*} config 
 */
async function buildAppWithConfig(config) {
  let app = new t.WorkOut();
  return app.processConfig(config).then(() => {
    return app;
  });
}
