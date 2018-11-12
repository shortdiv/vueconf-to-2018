<template>
  <div id="">
    <h1>{{ name }} Fog</h1>
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
</template>

<script>
export default {
  name: "RobustForm",
  data() {
    return {
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
#vue {
  background-color: #3bb881;
}

#vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3em;
  height: 100%;

  & > * {
    flex: 1 100%;
    align-self: flex-start;
  }
}

p,
label {
  color: #64b587;
  font-weight: bold;
}

h3 {
  &:after {
    content: "";
    border-bottom: 0.5px solid black;
    display: block;
    width: 230px;
  }
  padding-bottom: 10px;
}

.tea-label {
  display: block;
  position: relative;
  color: rgba(14, 30, 37, 0.54);
  font-weight: 300;
  font-size: 1.35em;
  padding: 10px 10px 10px 30px;
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
    top: 10px;
    margin-left: 15px;
  }
}
.checked {
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
</style>
