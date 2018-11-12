<template>
  <div id="vue">
    <div
      :class="{ notification: true, loading: countdown }"
      v-if="hasNotifications"
    >
      <div class="notification--icon">
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
  name: "Communicative",
  data() {
    return {
      countdown: null,
      hasNotifications: false,
      sent: false,
      status: {},
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

form {
  margin: 5em;
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
  color: #64b587;
  font-weight: bold;
}
.tea,
.milk {
  width: 300px;
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
  top: 10px;
  right: 10px;
  width: 179px;
  padding: 20px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 3px;
  background: white;
  color: #64b587;
  &:after {
    content: "";
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    top: 17%;
    background-color: #282c34;
    -webkit-transform: translate(-100%);
    transform: translate(-100%);
  }
  &--remove {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  &--icon {
    text-align: center;
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
.loading {
  &.notification:after {
    animation: loading 3s forwards;
  }
}
@keyframes loading {
  100% {
    transform: translate(0);
  }
}
</style>
