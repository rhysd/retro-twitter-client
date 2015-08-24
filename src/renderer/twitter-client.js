import remote from 'remote';
const Twitter = remote.require('twitter');

class TwitterClient {
  constructor({ accessToken, accessTokenSecret, consumerKey, consumerSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  fetchAccount() {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'account/verify_credentials',
        (error, account, response) => {
          resolve({ account: account, response: response });
        }
      );
    });
  }

  fetchTweets() {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'statuses/home_timeline',
        {
          screen_name: 'r7kamura'
        },
        (error, tweets, response) => {
          resolve({ tweets: tweets, response: response });
        }
      );
    });
  }

  getTwitter() {
    if (!this.twitter) {
      this.twitter = new Twitter({
        access_token_key: this.accessToken,
        access_token_secret: this.accessTokenSecret,
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret
      });
    }
    return this.twitter;
  }
}

const application = remote.getGlobal('application');
export default new TwitterClient({
  accessToken: application.accessToken,
  accessTokenSecret: application.accessTokenSecret,
  consumerKey: application.consumerKey,
  consumerSecret: application.consumerSecret
});
