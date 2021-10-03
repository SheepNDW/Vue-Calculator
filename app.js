const vm = new Vue({
  el: "#app",
  data: {
    //初始值為0
    equation: "0",
    //是否已有小數點
    isDecimalAdded: false,
    //是否已有運算符(+-x÷)
    isOperatorAdded: false,
    //是否已開始輸入數字
    isStarted: false,
    //是否運算過
    isEnter: false,
  },
  methods: {
    // Check if the character is + / - / × / ÷
    isOperator(character) {
      return ["+", "-", "×", "÷"].indexOf(character) > -1;
    },
    // When pressed Operators or Numbers
    append(character) {
      // Start
      if (this.equation === "0" && !this.isOperator(character)) {
        if (character === ".") {
          this.equation += "" + character;
          this.isDecimalAdded = true;
        } else {
          this.equation = "" + character;
          this.isEnter = true;
        }

        this.isStarted = true;
        return;
      }

      // If Number
      if (!this.isOperator(character)) {
        if (character === "." && this.isDecimalAdded) {
          return;
        }

        if (character === ".") {
          this.isDecimalAdded = true;
          this.isOperatorAdded = true;
        } else {
          this.isOperatorAdded = false;
        }

        if (!this.isEnter) {
          this.isEnter = true;
          this.equation = "" + character;
          return;
        }

        this.equation += "" + character;
      }

      // Added Operator
      if (this.isOperator(character) && !this.isOperatorAdded) {
        this.equation += "" + character;
        this.isDecimalAdded = false;
        this.isOperatorAdded = true;
        this.isEnter = true;
      }
    },
    // When pressed '='
    calculate() {
      //替換 × ÷ 為運算的 * /
      let result = this.equation
        .replace(new RegExp("×", "g"), "*")
        .replace(new RegExp("÷", "g"), "/");

      this.equation = parseFloat(eval(result).toFixed(9)).toString();

      this.isDecimalAdded = false;
      this.isOperatorAdded = false;
      this.isEnter = false;
    },
    // When pressed '+/-'
    calculateToggle() {
      if (this.isOperatorAdded || !this.isStarted) {
        return;
      }

      this.equation = this.equation + "* -1";
      this.calculate();
    },
    // When pressed '%'
    calculatePercentage() {
      if (this.isOperatorAdded || !this.isStarted) {
        return;
      }

      this.equation = this.equation + "* 0.01";
      this.calculate();
    },
    // When pressed 'AC'
    clear() {
      this.equation = "0";
      this.isDecimalAdded = false;
      this.isOperatorAdded = false;
      this.isStarted = false;
      this.isEnter = false;
    },
  },
});
