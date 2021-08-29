<template>
  <div>
    <div class="container">
      <div class="login card" v-if="loggedin === ''">
        <h1 class="title">Login</h1>
        <hr />
        <div>
          <table>
            <tr>
              <td class="attributes">Username:&nbsp;</td>
              <td><input type="text" class="input" v-model="username" /></td>
            </tr>
            <tr>
              <td class="attributes">Password:&nbsp;</td>
              <td>
                <input type="password" class="input" v-model="password" />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button @click="login" class="button">Login</button>
              </td>
            </tr>
          </table>
          <span style="color: red">{{ this.error }}</span>
          <a href="" class="attributes" @click="showRegister"
            >Don't have an account?</a
          >
        </div>
      </div>

      <div class="register card" v-else-if="loggedin === 'register'">
        <h1 class="title">Register</h1>
        <hr />
        <div>
          <table>
            <tr>
              <td class="attributes">Name:&nbsp;</td>
              <td>
                <input
                  type="text"
                  class="input"
                  name=""
                  id=""
                  v-model="nameR"
                />
              </td>
            </tr>
            <tr>
              <td class="attributes">Surname:&nbsp;</td>
              <td>
                <input
                  type="text"
                  class="input"
                  name=""
                  id=""
                  v-model="surnameR"
                />
              </td>
            </tr>
            <tr>
              <td class="attributes">Username:&nbsp;</td>
              <td>
                <input
                  type="text"
                  class="input"
                  name=""
                  id=""
                  v-model="usernameR"
                />
              </td>
            </tr>
            <tr>
              <td class="attributes">Password:&nbsp;</td>
              <td>
                <input
                  type="password"
                  class="input"
                  name=""
                  id=""
                  v-model="passwordR"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button @click="register" class="button">Register</button>
              </td>
            </tr>
          </table>
          <span style="color: red">{{ this.errorR }}</span>
          <a href="" class="attributes" @click="backToLogin"
            >I already have an account</a
          >
        </div>
      </div>

      <div class="loggedin user" v-else>
        <h2 class="title">@{{ this.loggedin.username }}</h2>
        <hr />
        <div>
          <table>
            <tr>
              <td class="attributes">Name:&nbsp;</td>
              <td class="title">
                <h3>{{ this.loggedin.name }}</h3>
              </td>
            </tr>
            <tr>
              <td class="attributes">Surname:&nbsp;</td>
              <td class="title">
                <h3>{{ this.loggedin.surname }}</h3>
              </td>
            </tr>
            <br />
          </table>

          <table class="receipts">
            <tr>
              <td colspan="6" class="title"><h4>My receipts:</h4></td>
            </tr>
            <br />
            <tr class="receipts__header">
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Group</th>
              <th>Duration</th>
              <th>Difficulty</th>
              <th>&nbsp;</th>
            </tr>
            <tr class="receipts__row" v-for="receipt of myReceipts" :key="receipt.name">
              <td class="closeButton" style="text-align: right">
                <img
                  src="../assets/remove.png"
                  alt=""
                  @click="remove(receipt.name)"
                />
              </td>
              <td>{{ receipt.name }}</td>
              <td>{{ receipt.group }}</td>
              <td>{{ receipt.duration }} minutes</td>
              <td>{{ formatDifficulty(receipt.difficulty) }}</td>
              <td @click="selectedReceipt = receipt" class="RecipeLink">
                View recipe
              </td>
            </tr>
            <br />
            <tr>
              <td colspan="6">
                <button class="button" @click="signout">Sign out</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Recipe
        :selectedReceipt="selectedReceipt"
        v-if="selectedReceipt !== null"
        :close="() => (selectedReceipt = null)"
      />
    </div>
  </div>
</template>

<style>
.container {
  padding-top: 20px;
}
.title {
  font-family: cursive;
  color: darkseagreen;
  padding-top: 10px;
}

.closeButton:hover {
  cursor: pointer;
}

table {
  margin: auto;
}

table td {
  padding-top: 10px;
}

.card {
  background-image: linear-gradient(rgb(225, 233, 230), rgb(240, 240, 240));
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 40%;
  margin: auto;
}

.RecipeLink {
  text-decoration: underline;
  color: #0d82eb;
}

.RecipeLink:hover {
  cursor: pointer;
}

.user {
  background-image: linear-gradient(rgb(225, 233, 230), rgb(240, 240, 240));
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 100%;
  margin: auto;
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
  width: 130px;
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
</style>

<script>
import users from "../data/users";
import Recipe from "@/components/Recipe.vue";
export default {
  data() {
    return {
      loggedin: "",
      password: "",
      username: "",
      usernameR: "",
      passwordR: "",
      nameR: "",
      surnameR: "",
      error: "",
      errorR: "",
      allUsers: [],
      receipts: [],
      myReceipts: [],
      selectedReceipt: null,
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
            this.error = "Incorrect password";
            return;
          }
      }
      this.error = "User doesn't exist";
    },
    showRegister() {
      sessionStorage.setItem("user", JSON.stringify("register"));
      location.reload();
    },
    backToLogin() {
      sessionStorage.removeItem("user");
      location.reload();
    },
    register() {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.allUsers[i].username == this.usernameR) {
          this.errorR = "User already exists.";
          return;
        }
      }

      let user = {
        username: this.usernameR,
        password: this.passwordR,
        name: this.nameR,
        surname: this.surnameR,
      };

      this.allUsers.push(user);
      localStorage.setItem("users", JSON.stringify(this.allUsers));

      this.errorR = "";
      sessionStorage.setItem("user", JSON.stringify(user));
      location.reload();
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
  },
};
</script>


