class Player {
  constructor(name, subscriber) {
    this.name = name;
    this.subscriber = subscriber;
    this.coins = subscriber ? 200 : 100;
  }
  steal(target) {
    this.gainMoney();
    return `@${this.name} stole from @${target}!`;
  }
  loseMoney() {
    this.coins -= 15;
  }
  gainMoney() {
    this.coins += 15;
  }
  reportCoins() {
    return `${this.coins}`;
  }
}

module.exports = Player;