<template>
  <div id="">
    <h1>{{ name }} Fog</h1>
    <LoadingCard v-if="loading"> </LoadingCard>
    <form action="" @submit.prevent="handleSubmit">
      <div class="tea-info">
        <h2>Fog Selection</h2>
        <div id="vue">
          <div class="tea">
            <h3>Pick Your Tea:</h3>
            <label
              v-for="tea in teaNames"
              :key="tea"
              :class="{
                'tea-label': true,
                checked: tea === chosenTea
              }"
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
            <h3>Pick your milk:</h3>
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
                :value="milk"
                v-model="chosenMilk"
                :disabled="isMilkDisabled(milk)"
              />
              <span>{{ milk }}</span>
            </label>
          </div>
          <div class="sweetener">
            <h3>Pick your sweetener:</h3>
            <label
              v-for="(sweetener, idx) in sweetenerNames"
              :key="`${sweetener}--${idx}`"
              :class="{
                'tea-label': true,
                checked: sweetener === chosenSweetener,
                disabled: isSweetenerDisabled(sweetener)
              }"
            >
              <input
                id="sweetener"
                name="sweetener"
                type="radio"
                :value="sweetener"
                v-model="chosenSweetener"
                :disabled="isSweetenerDisabled(sweetener)"
              />
              <span>{{ sweetener }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="contact-info">
        <h2>Contact Info</h2>
        <div class="name">
          <label class="name--label" for="">
            <h3>Name</h3>
            <input type="text" />
          </label>
        </div>
        <div class="phone-number">
          <label class="phone-number--label" for="">
            <h3>Phone Number</h3>
            <button v-if="errorMsg" @click.prevent="">
              <i class="fas fa-exclamation-circle"></i>
            </button>
            <span class="error" v-if="errorMsg"> {{ errorMsg }} </span>
            <input
              type="tel"
              maxlength="14"
              placeholder="(XXX)-XXX-XXXX"
              :class="{ error: errorMsg !== '' }"
              :value="formatNumber"
              @paste="validatePasteData"
              @keyup="handleChange"
            />
          </label>
        </div>
      </div>
      <button type="submit" class="submit-button" @click="handleSubmit">
        Order Up!
      </button>
    </form>
  </div>
</template>

<script>
import LoadingCard from "./LoadingCard.vue";
export default {
  name: "RobustForm",
  components: {
    LoadingCard
  },
  data() {
    return {
      countdown: null,
      loading: false,
      errorMsg: "",
      formatNumber: "",
      chosenTea: "Earl Grey",
      chosenMilk: "Whole Milk",
      chosenSweetener: "Vanilla",
      teaFogs: {
        "Earl Grey": {
          "Whole Milk": {
            Vanilla: ["London"],
            Amaretto: [],
            Hazelnut: [],
            Agave: ["Mexican"],
            Coconut: ["Maui"],
            Almond: ["Nanaimo"],
            Lavender: ["Savanna"]
          },
          "Soy Milk": {
            Vanilla: ["Seattle"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        "English Breakfast": {
          "Whole Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: ["Oxford Haze"],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        "Irish Breakfast": {
          "Whole Milk": {
            Vanilla: ["Dublin"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        Chai: {
          "Whole Milk": {
            Vanilla: ["Bombay"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        Rose: {
          "Whole Milk": {
            Vanilla: ["Atlantic City"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        Matcha: {
          "Whole Milk": {
            Vanilla: ["Tokyo"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        Rooibos: {
          "Whole Milk": {
            Vanilla: ["Cape Town"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        "Yerba Mate": {
          "Whole Milk": {
            Vanilla: ["Montreal"],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        },
        Green: {
          "Whole Milk": {
            Vanilla: [],
            Amaretto: [],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          },
          "Soy Milk": {
            Vanilla: [],
            Amaretto: ["Oregon"],
            Hazelnut: [],
            Agave: [],
            Coconut: [],
            Almond: [],
            Lavender: []
          }
        }
      }
    };
  },

  methods: {
    isMilkDisabled(milk) {
      return (
        this.teaFogs[this.chosenTea][milk][this.chosenSweetener].length <= 0
      );
    },
    isSweetenerDisabled(sweetener) {
      return (
        this.teaFogs[this.chosenTea][this.chosenMilk][sweetener].length <= 0
      );
    },
    northAmericanize(evt, num) {
      if (Number.isNaN(Number(num)) && num.indexOf("(") > 0) {
        return "";
      }
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
    removeNotification() {
      clearTimeout(this.countdown);
      this.loading = false;
    },
    handleChange(e) {
      console.log(e.which);
      if (this.isNotValidNumChar(e.which) && this.isNotDelete(e.which)) {
        // show error //
        this.errorMsg = "Only numbers allowed";
      } else if (!this.isNotDelete(e.which)) {
        if (event.target.value === "") {
          this.errorMsg = "";
        }
      }
      this.number = e.target.value;
      this.formatNumber = this.northAmericanize(e, this.number);
      console.log(this.number);
      this.formatNumber === "" ? this.number : this.formatNumber;
    },
    handleSubmit() {
      this.countdown = setTimeout(this.removeNotification, 7000);
      this.loading = true;
    }
  },
  watch: {
    chosenTea() {
      for (var i = 0; i < this.milkNames.length; i++) {
        for (var j = 0; j < this.sweetenerNames.length; j++) {
          if (
            this.teaFogs[this.chosenTea][this.milkNames[i]][
              this.sweetenerNames[j]
            ].length > 0
          ) {
            this.chosenMilk = this.milkNames[i];
            this.chosenSweetener = this.sweetenerNames[j];
            return;
          }
        }
      }
    }
  },
  computed: {
    teaNames() {
      return Object.keys(this.teaFogs);
    },
    milkNames() {
      return ["Whole Milk", "Soy Milk"];
    },
    sweetenerNames() {
      return [
        "Vanilla",
        "Amaretto",
        "Hazelnut",
        "Agave",
        "Coconut",
        "Almond",
        "Lavender"
      ];
    },
    name() {
      return this.teaFogs[this.chosenTea][this.chosenMilk][
        this.chosenSweetener
      ][0];
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 3em;
}

#vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    &:after {
      content: "";
      border-bottom: 0.5px solid black;
      display: block;
      width: 230px;
    }
    padding-bottom: 10px;
  }

  & > * {
    flex: 1 100%;
    align-self: flex-start;
  }
}

p,
label {
  font-weight: bold;
}

h3 {
  width: 100%;
  margin-bottom: 0.75em;
}

span {
  &.error {
    color: #e74e50;
  }
}

.tea-label {
  display: block;
  position: relative;
  color: white;
  font-weight: 300;
  font-size: 1.35em;
  padding: 10px 10px 10px 30px;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
  &.disabled {
    opacity: 0.2;
  }
  &:before {
    content: "";
    display: inline-block;
    border: 5px solid white;
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
    top: 10px;
    margin-left: 15px;
  }
}
.checked {
  &:after {
    content: "";
    display: block;
    background: #3bb881;
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

input[type="tel"],
input[type="text"] {
  border: 3px solid #d5d8dc;
  border-radius: 0 3px 3px 0;
  width: 250px;
  height: 2.6em;
  display: block;
  padding: 0.5em;
  font-size: 1em;
  &:focus {
    outline: none;
    border-color: #616574;
    background: #fff;
    &.error {
      border: 3px solid #e74e50;
    }
  }
  &.error {
    border: 3px solid #e74e50;
  }
}

.phone-number,
.name {
  display: inline-block;
  width: 50%;
  h3 {
    display: inline-block;
    width: 31%;
    background: none;
    border: none;
  }
  span {
    font-size: 1.2em;
    font-weight: 100;
    width: 100%;
  }
  & button {
    font-size: 1em;
    color: #e74e50;
    border: none;
    background: none;
  }
  & input {
    font-size: 1.35em;
    padding: 0.5em;
    border-radius: 5px;
    &:focus {
      outline: none;
      border-color: #616574;
      background: #fff;
    }
  }
  &--label {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    font-size: 0.875rem;
  }
}
.contact-info,
.tea-info {
  padding: 1em 3em;
  h2 {
    &:after {
      content: "";
      padding-bottom: 10px;
      border-bottom: 0.5px solid black;
      display: block;
      width: 100%;
    }
  }
}
.submit-button {
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
</style>
