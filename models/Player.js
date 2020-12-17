class Player {
  constructor(name, subscriber) {
    this.name = name;
    this.subscriber = subscriber;
    this.coins = subscriber ? 200 : 100;
  }
  steal(target) {
    this.gainMoney();
  }
  loseMoney() {
    this.coins -= 15;
  }
  gainMoney() {
    this.coins += 15;
  }
  resetCoins() {
    this.coins = 100;
  }
  reportCoins() {
    return `${this.coins}`;
  }
}

module.exports = Player;