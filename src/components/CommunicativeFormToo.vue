<template>
  <div id="vue">
    <div class="notification" v-if="hasNotifications">
      <div class="notification---icon">
        <i class="fas" :class="iconClass"></i>
      </div>
      <div><p v-text="status.text"></p></div>
      <button
        type="button"
        class="notification--remove"
        @click="removeNotification();"
      >
        <i class="fa fa-times"></i>
      </button>
    </div>
    <form method="post" @submit.prevent="handleSubmit">
      <div class="tea">
        <h2>Tea</h2>
        <label
          v-for="(tea, idx) in teaNames"
          :key="`${tea}--${idx}`"
          :class="{ 'tea-label': true, checked: tea === chosenTea }"
        >
          <input
            id="tea"
            name="tea"
            type="radio"
            :value="tea"
            v-model="chosenTea"
          />
          <span>{{ tea }}</span>
        </label>
      </div>
      <div class="milk">
        <h2>Milk</h2>
        <button type="button" class="" @click="togglePopup();">
          <i class="fas fa-info-circle"></i>
        </button>
        <transition name="bounce">
          <div v-show="showPopup"><p v-text="helptext"></p></div>
        </transition>
        <label
          v-for="(milk, idx) in milkNames"
          :key="`${milk}--${idx}`"
          :class="{
            'tea-label': true,
            checked: milk === chosenMilk,
            disabled: isMilkDisabled(milk)
          }"
        >
          <input
            id="milk"
            name="milk"
            type="radio"
            :disabled="isMilkDisabled(milk)"
            :value="milk"
            v-model="chosenMilk"
          />
          <span>{{ milk }}</span>
        </label>
      </div>
      <button type="submit" class="submit-button">Order Up!</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CommunicativeFormToo",
  data() {
    return {
      showPopup: false,
      helptext:
        "Anyone who has used that comforting phrase 'a nice cup of tea' invariably means tea with a spot of milk. ",
      countdown: null,
      hasNotifications: false,
      sent: false,
      status: {},
      formatNumber: "",
      chosenTea: "Earl Grey",
      chosenMilk: "Whole Milk",
      teaTypes: {
        "Earl Grey": ["London", "Manchester", "Seattle"],
        "Irish Breakfast": ["Dublin"],
        Chai: ["Bombay"],
        Rose: ["Atlantic City"],
        Matcha: ["Tokyo"],
        Rooibos: ["Cape Town"],
        "Yerba Mate": ["Montreal"],
        Green: ["Oregon Mist"]
      },
      milkTypes: {
        "Whole Milk": [
          "London",
          "Oregon Mist",
          "Dublin",
          "Bombay",
          "Atlantic City",
          "Maui",
          "Tokyo",
          "Cape Town",
          "Nanaimo Mist",
          "Montreal",
          "Mexico",
          "Halifax"
        ],
        "Soy Milk": ["Manchester", "Seattle"]
      }
    };
  },
  watch: {
    status() {
      this.hasNotifications = true;
      this.countdown = setTimeout(this.removeNotification, 3000);
    }
  },
  methods: {
    removeNotification() {
      clearTimeout(this.countdown);
      this.hasNotifications = false;
    },
    handleSubmit() {
      new Promise(resolve => {
        setTimeout(function() {
          resolve("Success!");
        }, 250);
      })
        .then(() => {
          this.sent = true;
          this.status = {
            code: "success",
            text: `1 ${this.name[0]} Fog Coming Right Up!`
          };
        })
        .catch(error => {
          this.sent = true;
          this.status = {
            code: "error",
            text: error
          };
        });
    },
    isMilkDisabled(milk) {
      //blargh//
      const tea = this.teaTypes[this.chosenTea].filter(element =>
        this.milkTypes[milk].includes(element)
      );
      //pick other milk//
      if (this.chosenMilk === milk && tea.length === 0) {
        var idx = Object.keys(this.milkTypes).indexOf(milk);
        if (idx === 0) {
          this.chosenMilk = Object.keys(this.milkTypes)[1];
        } else {
          this.chosenMilk = Object.keys(this.milkTypes)[0];
        }
      }
      return tea.length === 0;
    },
    northAmericanize(evt, num) {
      // thanks to https://stackoverflow.com/a/29335409
      var x = num.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      num = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      return num;
    },
    validatePasteData(e) {
      if (Number.isNaN(parseFloat(event.clipboardData.getData("Text")))) {
        e.preventDefault();
        return;
      }
    },
    isNotValidNumChar(charCode) {
      return charCode < 48 || charCode > 57;
    },
    isNotDelete(charCode) {
      return charCode !== 8 && charCode !== 46;
    },
    handleChange(e) {
      if (this.isNotValidNumChar(e.which) && this.isNotDelete(e.which)) {
        e.preventDefault();
        return;
      }
      this.number = e.target.value;
      this.formatNumber = this.northAmericanize(e, this.number);
    },
    togglePopup() {
      this.showPopup = !this.showPopup;
    }
  },
  computed: {
    iconClass() {
      switch (this.status.code) {
        case "success":
          return "fa-check";
        case "error":
          return "fa-exclamation";
      }
    },
    teaNames() {
      return Object.keys(this.teaTypes);
    },
    milkNames() {
      return Object.keys(this.milkTypes);
    },
    name() {
      const tea = this.teaTypes[this.chosenTea].filter(element =>
        this.milkTypes[this.chosenMilk].includes(element)
      );
      return tea;
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #3bb881;
}

button {
  background: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
}

#vue {
  h2 {
    font-size: 2em;
  }
  & .submit-button {
    width: 100%;
    padding: 20px 60px;
    outline: none;
    background-color: #282c34;
    border: none;
    border-radius: 5px;
    box-shadow: 0 9px #95a5a6;
    font-size: 1.2em;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }
}

#vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > * {
    flex: 1 100%;
  }
}

form {
  margin: 5em;
}

li {
  margin-bottom: 1em;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
}

h2 {
  margin: 0;
}

p,
label {
  font-weight: bold;
}

.tea-label {
  display: block;
  position: relative;
  color: rgba(14, 30, 37, 0.54);
  font-weight: 300;
  font-size: 1.35em;
  padding: 10px 10px 10px 30px;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
  &.disabled {
    opacity: 0.5;
  }
  &:before {
    content: "";
    display: inline-block;
    border: 5px solid #282c34;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    top: 30px;
    left: 20px;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
    + .checked {
      background: red;
    }
  }
  & span {
    position: absolute;
    top: 15px;
    margin-left: 15px;
  }
}
.checked {
  &:before {
    //background: white;
  }
  &:after {
    content: "";
    display: block;
    background: #282c34;
    border-radius: 100%;
    height: 15px;
    width: 15px;
    top: 20px;
    left: 40px;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
    position: absolute;
  }
}

input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.notification {
  position: fixed;
  z-index: 5;
  box-sizing: border-box;
  top: 10px;
  right: 10px;
  width: 179px;
  padding: 20px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 3px;
  background: white;
  color: #64b587;
  border-bottom: 5px solid #64b587;

  &--remove {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 15px;

    &:hover {
      cursor: pointer;
    }
  }
}

.fa {
  position: relative;
  width: 100%;
  text-align: center;
}

.fa-check {
  color: #64b587;
}

.fa-exclamation {
  color: #e74e50;
}

button {
  border: none;
}

input[type="text"] {
  border: 3px solid #d5d8dc;
  border-radius: 0 3px 3px 0;
  width: 100%;
  height: 2.6em;
  display: block;
  padding: 0.5em;
  font-size: 1em;
  &:focus {
    outline: none;
    border-color: #616574;
    background: #fff;
  }
}

.milk {
  h2 {
    display: inline-block;
  }
  button {
    vertical-align: top;
  }
  p {
    margin: 0;
    font-style: italic;
    font-weight: 100;
  }
}
</style>
