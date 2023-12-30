const app = {
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      specialAttackCooldown: 0,
      healCooldown: 0,
      battleLog: [],
      gameOver: false,
    };
  },
  methods: {
    playerAttack() {
      const attackDamage = this.getRandomNumber(0, 15);
      this.monsterHealth -= attackDamage;
      this.monsterAttack();
      this.lowerSpecialAttackCooldown();
      this.lowerHealCooldown();
      this.battleLog.unshift(`Player attacked and did ${attackDamage} damage!`);
    },

    playerSpecialAttack() {
      const specialAttackDamage = this.getRandomNumber(10, 20);
      this.monsterHealth -= specialAttackDamage;
      this.monsterAttack();
      this.specialAttackCooldown = 5;
      this.lowerHealCooldown();
      this.battleLog.unshift(
        `Player used Special Attack and did ${specialAttackDamage} damage!`
      );
    },

    playerHeal() {
      let healAmount = this.getRandomNumber(5, 30);
      if (this.playerHealth + healAmount > 100)
        healAmount = 100 - this.playerHealth;

      this.playerHealth += healAmount;
      this.monsterAttack();
      this.lowerSpecialAttackCooldown();
      this.healCooldown = 3;
      this.battleLog.unshift(`Player healed ${healAmount} hitpoints!`);
    },

    playerSurrender() {
      this.playerHealth = 0;
      this.battleLog.unshift("Player surrendered!");
    },

    monsterAttack() {
      const attackDamage = this.getRandomNumber(5, 15);
      this.playerHealth -= attackDamage;
      this.battleLog.unshift(
        `Monster attacked and did ${attackDamage} damage!`
      );
    },

    getRandomNumber(from, to) {
      return Math.floor(Math.random() * (to - from + 1)) + from;
    },

    lowerSpecialAttackCooldown() {
      if (this.specialAttackCooldown > 0) {
        this.specialAttackCooldown--;
      }
    },

    lowerHealCooldown() {
      if (this.healCooldown > 0) {
        this.healCooldown--;
      }
    },

    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.specialAttackCooldown = 0;
      this.healCooldown = 0;
      this.gameOver = false;
      this.battleLog = [];
    },
  },
  computed: {
    playerHealthUI() {
      return { width: this.playerHealth + "%" };
    },
    monsterHealthUI() {
      return { width: this.monsterHealth + "%" };
    },
    healDisabled() {
      return this.healCooldown != 0 || this.gameOver;
    },
    specialAttackDisabled() {
      return this.specialAttackCooldown != 0 || this.gameOver;
    },
    gameOverMessage() {
      if (this.playerHealth > 0 && this.monsterHealth === 0)
        return "Game over! You won :)";
      if (this.monsterHealth > 0 && this.playerHealth === 0)
        return "Game over! You lost :(";
      return "It's a draw!";
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.playerHealth = 0;
        this.gameOver = true;
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.monsterHealth = 0;
        this.gameOver = true;
      }
    },
  },
};

Vue.createApp(app).mount("#game");
