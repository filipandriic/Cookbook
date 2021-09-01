<template>
  <div class="ModalContainer">
    <div class="ModalContent">
      <span @click="close" class="ModalContent__close">X</span>
      <h2 class="title" style="text-align: center">
        {{ selectedReceipt.name }}
      </h2>
      <hr />
      <h3>{{dictionary[language].duration}}:&nbsp;{{ selectedReceipt.duration }} mins</h3>
      <h3>
        {{dictionary[language].difficulty}}:&nbsp;{{ formatDifficulty(selectedReceipt.difficulty) }}
      </h3>
      <h3>{{dictionary[language].chef}}:&nbsp;{{ selectedReceipt.user }}</h3>
      <h3>{{dictionary[language].group}}:&nbsp;{{ selectedReceipt.group }}</h3>
      <div style="display: flex">
        <h3>{{dictionary[language].rating}}:&nbsp;</h3>
        <h3 style="color: #ffc700">{{ formatRate(this.myRate) }}</h3>
      </div>

      <hr />
      <h3 class="rate__header">{{dictionary[language].rate}}:</h3>
      <div class="rate">
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
      </div>
      <div class="rate__button">
        <button class="button" @click="rateRecipe">{{dictionary[language].rate}}</button>

      </div>
      <hr />
      <h3 class="comments">{{dictionary[language].comments}}:</h3>
      <div
        style="display: flex"
        v-for="(comm, index) in this.myComments"
        :key="index"
      >
        <div>
          <b>{{ comm.user.username }}{{ comm.isChef }}:&nbsp;</b>
        </div>
        <div>{{ comm.text }}</div>
      </div>
      <hr />
      <textarea
        name=""
        id="myComment"
        cols="30"
        rows="10"
        placeholder="Leave a comment..."
        v-model="comment"
      ></textarea>
      <button class="button" @click="commentate">{{dictionary[language].comment}}</button>
    </div>
  </div>
</template>

<style>
textarea {
  width: 100%;
  height: 150px;
  padding: 5px 5px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  resize: none;
}

.ModalContainer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.ModalContent {
  padding: 24px;
  width: 50%;
  height: 80%;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5px #585858;
  text-align: left;
  position: relative;
  overflow: auto;
}

.ModalContent__close {
  position: absolute;
  right: 24px;
  top: 12px;
  font-size: 24px;
}

.ModalContent__close:hover {
  cursor: pointer;
}

.button {
  color: floralwhite;
  background-color: darkseagreen;
  border-radius: 10px;
  width: 130px;
  font-size: 19px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.title {
  font-family: cursive;
  color: darkseagreen;
}

.rate__header {
  text-align: right;
}

.rate__button {
  display: flex;
  justify-content: flex-end;
  clear: both;
}

.rate__button > button {
  margin-top: 12px;
}

.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
</style>

<script>
import dictionary from "@/data/dictionary";

export default {
  name: "Recipe",
  data() {
    return {
      comments: [],
      myComments: [],
      comment: "",
      rates: [],
      myRates: [],
      myRate: "",
      language: "",
      dictionary,
    };
  },
  methods: {
    formatDifficulty(difficulty) {
      let result = "";
      for (let i = 0; i < difficulty; i++) {
        result += "★";
      }

      return result;
    },
    formatRate(rate) {
      let result = "";
      for (let i = 0; i < rate; i++) {
        result += "★";
      }

      return result;
    },
    commentate() {
      if (this.comment == "") return;

      let newComment = {
        text: this.comment,
        user: JSON.parse(sessionStorage.getItem("user")),
        recipe: this.selectedReceipt,
        isChef: "",
      };

      if (newComment.user.username === this.selectedReceipt.user)
        newComment.isChef = "(chef)";

      this.myComments.push(newComment);

      this.comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(this.comments));
      this.comment = "";
    },
    rateRecipe() {
      if (document.querySelector('input[name="rate"]:checked') == null) {
        return;
      }
      let newRate = {
        number: document.querySelector('input[name="rate"]:checked').value,
        user: JSON.parse(sessionStorage.getItem("user")),
        recipe: this.selectedReceipt,
        chef: this.selectedReceipt.user,
      };

      for (let i = 0; i < this.rates.length; i++) {
        if (
          JSON.stringify(this.rates[i].user) == JSON.stringify(newRate.user) &&
          JSON.stringify(this.rates[i].recipe) ==
            JSON.stringify(newRate.recipe) &&
          this.rates[i].chef == newRate.chef
        ) {
          this.rates[i].number = newRate.number;
          localStorage.setItem("rates", JSON.stringify(this.rates));
          this.formatMyRates();
          return;
        }
      }

      this.rates.push(newRate);
      localStorage.setItem("rates", JSON.stringify(this.rates));
      this.formatMyRates();
    },
    formatMyRates() {
      this.myRates = [];
      let sum = 0;
      for (let rate of this.rates) {
        if (
          rate.recipe.name == this.selectedReceipt.name &&
          rate.recipe.user == this.selectedReceipt.user
        ) {
          this.myRates.push(rate);
          sum += parseInt(rate.number);
        }
      }

      if (this.myRates.length > 0) {
        this.myRate = Math.trunc(sum / this.myRates.length);
      } else {
        this.myRate = "NaN";
      }
    },
  },
  props: ["selectedReceipt", "close"],
  created() {
    this.language = localStorage.getItem("language");

    //comments
    if (localStorage.getItem("comments") == null) this.comments = [];
    else this.comments = JSON.parse(localStorage.getItem("comments"));

    for (let comm of this.comments) {
      if (
        comm.recipe.name == this.selectedReceipt.name &&
        comm.recipe.user == this.selectedReceipt.user
      ) {
        this.myComments.push(comm);
      }
    }

    //rates
    if (localStorage.getItem("rates") == null) this.rates = [];
    else this.rates = JSON.parse(localStorage.getItem("rates"));

    this.formatMyRates();
  },
  mounted() {
    for (let rate of this.myRates) {
      if (JSON.stringify(rate.user) === sessionStorage.getItem("user")) {
        let id = "star" + rate.number;
        document.getElementById(id).checked = true;
      }
    }
  },
};
</script>