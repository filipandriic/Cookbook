<template>
  <div>
    <div class="MyAccount">
      <div class="login card" v-if="loggedin === ''">
        <h1 class="title">{{dictionary[language].login}}</h1>
        <hr />
        <div>
          <table>
            <tr>
              <td class="attributes">{{dictionary[language].username}}:&nbsp;</td>
              <td class="left">
                <input type="text" class="input" v-model="username" />
              </td>
            </tr>
            <tr>
              <td class="attributes">{{dictionary[language].password}}:&nbsp;</td>
              <td class="left">
                <input type="password" class="input" v-model="password" />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button @click="login" class="button">{{dictionary[language].login}}</button>
              </td>
            </tr>
          </table>
          <span style="color: red">{{ this.error }}</span>
          <br>
          <a href="" class="attributes" @click="showRegister"
            >{{dictionary[language].dontHaveAnAccount}}</a
          >
        </div>
      </div>

      <div class="user" v-else>
        <div class="card__header">
          <h3 class="title">HelpmeChef.com</h3>
          <button class="button" @click="signout">{{dictionary[language].signout}}</button>
        </div>

        <hr />
        <div>
          <div class="user__info">
            <table align="right" class="user__info__table">
              <tr>
                <td class="attributes">{{dictionary[language].username}}:&nbsp;</td>
                <td class="title left">
                  <h3>@{{ this.loggedin.username }}</h3>
                </td>
              </tr>
              <tr>
                <td class="attributes">{{dictionary[language].name}}:&nbsp;</td>
                <td class="title left">
                  <h3>{{ this.loggedin.name }}</h3>
                </td>
              </tr>
              <tr>
                <td class="attributes">{{dictionary[language].surname}}:&nbsp;</td>
                <td class="title left">
                  <h3>{{ this.loggedin.surname }}</h3>
                </td>
              </tr>
              <br />
            </table>
          </div>

          <hr />
          <h3 class="title">{{dictionary[language].myRecipes}}:</h3>
          <div class="RecipeGroupContainer">
            <div
              class="RecipeGroup"
              v-for="group of Object.keys(formattedReceipts)"
              :key="group"
            >
              <h2 class="RecipeGroup__header">{{ group }}</h2>
              <div
                class="RecipeGroup__card"
                v-for="(receipt, index) of formattedReceipts[group]"
                :key="index"
              >
                <div class="RecipeGroup__row">
                  <span>{{dictionary[language].name}}: {{ receipt.name }}</span>
                  <span>{{dictionary[language].duration}}: {{ receipt.duration }} mins</span>
                </div>
                <div class="RecipeGroup__row">
                  <span
                    >{{dictionary[language].difficulty}}:
                    {{ formatDifficulty(receipt.difficulty) }}</span
                  >
                  <span
                    @click="selectedReceipt = receipt"
                    class="RecipeGroup__link"
                    >{{dictionary[language].viewRecipe}}</span
                  >
                </div>
              </div>
            </div>
            <Recipe
              :selectedReceipt="selectedReceipt"
              v-if="selectedReceipt !== null"
              :close="() => (selectedReceipt = null)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.user__info {
  display: flex;
  justify-content:flex-end;
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
}

.title {
  font-family: cursive;
  color: darkseagreen;
  padding-top: 10px;
}

.MyAccount {
  display: flex;
  justify-content: space-around;
}

.left {
  text-align: left;
}

.closeButton:hover {
  cursor: pointer;
}

.user__info__table {
  margin-left: auto;
  margin-right: 70px;
}

table td {
  padding-top: 10px;
}

.card {
  background: white;
  box-shadow: 0 0 5px #585858;
  transition: 0.3s;
  border-radius: 5px;
  width: 40%;
  margin: auto;
  margin-top: 150px;
}

.RecipeLink {
  text-decoration: underline;
  color: #0d82eb;
}

.RecipeLink:hover {
  cursor: pointer;
}

.user {
  background: white;
  box-shadow: 0 0 5px #585858;
  transition: 0.3s;
  border-radius: 5px;
  width: 80vw;
  margin: auto;
  margin-top: 20px;
}

.attributes {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
}

.input {
  border-radius: 7px;
}

.button {
  margin-top: 30px;
  margin-bottom: 10px;
  color: floralwhite;
  background-color: darkseagreen;
  border-radius: 10px;
  width: 150px;
  font-size: 19px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.delete {
  color: floralwhite;
  background-color: darkseagreen;
  border-radius: 10px;
  width: 40%;
  font-size: 17px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.receipts {
  width: 100%;
}

.receipts__header {
  padding: 24px 0;
  background: #9aa6bd;
}

.receipts__row {
  background: #ced2db;
}

.receipts__row > td {
  display: flex-inline;
  align-items: center;
  padding-bottom: 10px;
}

.receipts__row:nth-of-type(even) {
  background: #dddfe4;
}

.receipts__row:hover {
  background: #b8bbc4;
}

.receipts td {
  padding-top: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 17px;
}

.receipts img {
  width: 30px;
}

.RecipeGroupContainer {
  padding: 20px 0 20px 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.RecipeGroup {
  background: white;
  width: 100%;
  border-radius: 5px;
  margin-right: 20px;
  box-shadow: 0 0 5px #585858;
  height: 100%;
  overflow: auto;
}

.RecipeGroup__row {
  display: flex;
  justify-content: space-between;
}

.RecipeGroup__link {
  text-decoration: underline;
  color: #0d82eb;
}

.RecipeGroup__link:hover {
  cursor: pointer;
}

.RecipeGroup__card {
  padding: 12px;
  border: 1px solid #585858;
  border-radius: 5px;
  margin: 0px 16px 12px 16px;
}

.RecipeGroup__header {
  margin: 32px 0;
  font-family: cursive;
  color: darkseagreen;
}
</style>

<script>
import users from "../data/users";
import Recipe from "@/components/Recipe.vue";
import dictionary from "@/data/dictionary";
export default {
  data() {
    return {
      loggedin: "",
      password: "",
      username: "",
      error: "",
      allUsers: [],
      receipts: [],
      myReceipts: [],
      formattedReceipts: {},
      selectedReceipt: null,
      dictionary,
      language: "",
    };
  },
  components: { Recipe },
  methods: {
    formatDifficulty(difficulty) {
      let result = "";
      for (let i = 0; i < difficulty; i++) {
        result += "★";
      }

      return result;
    },
    login() {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.username == this.allUsers[i].username)
          if (this.password == this.allUsers[i].password) {
            this.error = "";
            sessionStorage.setItem("user", JSON.stringify(this.allUsers[i]));
            location.reload();
            return;
          } else {
            if (this.language == "en")
              this.error = "Incorrect password";
            else
              this.error = "Pogresna lozinka";
            return;
          }
      }
      if (this.language == "en")
        this.error = "User doesn't exist";
      else
        this.error = "Korisnik ne postoji";
    },
    showRegister() {
      this.$router.push("register");
    },
    signout() {
      sessionStorage.removeItem("user");
      location.reload();
    },
    remove(name) {
      for (let i = 0; i < this.myReceipts.length; i++) {
        if (this.myReceipts[i].name == name) {
          this.myReceipts.splice(i, 1);
        }
      }

      for (let i = 0; i < this.receipts.length; i++) {
        if (
          this.receipts[i].name == name &&
          this.receipts[i].user == this.loggedin.username
        ) {
          this.receipts.splice(i, 1);
        }
      }
      localStorage.setItem("receipts", JSON.stringify(this.receipts));
    },
  },
  created() {
    this.language = localStorage.getItem("language");

    if (localStorage.getItem("users") == null) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    this.allUsers = JSON.parse(localStorage.getItem("users"));

    if (sessionStorage.getItem("user") != null) {
      this.loggedin = JSON.parse(sessionStorage.getItem("user"));
    } else this.loggedin = "";

    if (localStorage.getItem("receipts") == null) this.receipts = [];
    else {
      this.receipts = JSON.parse(localStorage.getItem("receipts"));
      for (let i = 0; i < this.receipts.length; i++) {
        if (this.receipts[i].user == this.loggedin.username) {
          this.myReceipts.push(this.receipts[i]);
        }
      }
    }

    let formattedReceipts = {};
    for (let receipt of this.myReceipts) {
      if (!formattedReceipts[receipt.group]) {
        formattedReceipts[receipt.group] = [receipt];
        continue;
      }

      formattedReceipts[receipt.group] = [
        ...formattedReceipts[receipt.group],
        receipt,
      ];
    }

    this.formattedReceipts = formattedReceipts;
  },
};
</script>


