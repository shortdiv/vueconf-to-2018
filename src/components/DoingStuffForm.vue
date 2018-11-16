<template>
  <div id="vue">
    <h1>{{ name }}</h1>
    <div>
      <label
        v-for="(tea, idx) in teas"
        :key="`${tea}--${idx}`"
        :class="{
          'tea-label': true,
          checked: tea.name === chosenTea
        }"
      >
        <input
          id="tea.teaType"
          name="tea"
          type="radio"
          :value="tea.name"
          :checked="tea.name === chosenTea"
          @change="updateTea"
        />
        <span>{{ tea.teaType }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoingStuffForm",
  data() {
    return {
      chosenTea: "London",
      teas: [
        {
          teaType: "Earl Grey",
          name: "London"
        },
        {
          teaType: "Irish Breakfast",
          name: "Dublin"
        },
        {
          teaType: "Chai",
          name: "Bombay"
        },
        {
          teaType: "Rose Tea",
          name: "Atlantic City"
        },
        {
          teaType: "Matcha",
          name: "Tokyo"
        },
        {
          teaType: "Rooibos",
          name: "Cape Town"
        },
        {
          teaType: "Yerba Mate",
          name: "Montreal"
        }
      ]
    };
  },
  methods: {
    updateTea(event) {
      this.chosenTea = event.target.value;
      console.log(this.chosenTea);
    }
  },
  computed: {
    name() {
      return `${this.chosenTea} Fog`;
    }
  }
};
</script>

<style lang="scss" scoped>
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

p,
label {
  color: #64b587;
  font-weight: bold;
}
.tea-label {
  display: block;
  position: relative;
  color: white;
  font-weight: 300;
  font-size: 1.35em;
  padding: 10px 10px 10px 30px;
  margin: 10px auto;
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
</style>
