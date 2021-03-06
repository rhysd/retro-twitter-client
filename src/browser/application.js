import app from 'app'
import AuthenticationWindow from './authentication-window'
import crashReporter from 'crash-reporter'
import MainWindow from './main-window'

export default class Application {
  constructor() {
    this.accessToken = null;
    this.accessTokenSecret = null;
    this.consumerKey = 'KAR2eM09o2GCddFfHUXz7vFKV';
    this.consumerSecret = '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY';
    this.mainWindow = null;
  }

  onAuthenticationSucceeded({ accessToken, accessTokenSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.openMainWindow();
  }

  onReady() {
    this.openAuthenicationWindow();
  }

  onWindowAllClosed() {
    if (process.platform != 'darwin') {
      app.quit();
    }
  }

  openAuthenicationWindow() {
    new AuthenticationWindow({
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
    }).on(
      'authentication-succeeded',
      this.onAuthenticationSucceeded.bind(this)
    );
  }

  openMainWindow() {
    this.mainWindow = new MainWindow();
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    app.on('ready', this.onReady.bind(this));
  }

  run() {
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
