<template>
  <div class="register card">
    <h1 class="title">{{ dictionary[language].register }}</h1>
    <hr />
    <div>
      <table>
        <tr>
          <td class="attributes">{{ dictionary[language].name }}:&nbsp;</td>
          <td class="left">
            <input type="text" class="input" name="" v-model="nameR" />
          </td>
        </tr>
        <tr>
          <td class="attributes">{{ dictionary[language].surname }}:&nbsp;</td>
          <td class="left">
            <input type="text" class="input" name="" v-model="surnameR" />
          </td>
        </tr>
        <tr>
          <td class="attributes">{{ dictionary[language].username }}:&nbsp;</td>
          <td class="left">
            <input type="text" class="input" name="" v-model="usernameR" />
          </td>
        </tr>
        <tr>
          <td class="attributes">{{ dictionary[language].password }}:&nbsp;</td>
          <td class="left">
            <input type="password" class="input" name="" v-model="passwordR" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click="register" class="button">
              {{ dictionary[language].register }}
            </button>
          </td>
        </tr>
      </table>
      <span style="color: red">{{ this.errorR }}</span>
      <span style="color: green">{{ this.success }}</span>
    </div>
  </div>
</template>

<style>
table {
  margin: auto;
}

.title {
  font-family: cursive;
  color: darkseagreen;
  padding-top: 10px;
}

.attributes {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  text-align: right;
}

.left {
  text-align: left;
}

.input {
  border-radius: 7px;
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
  margin-top: 140px;
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
</style>

<script>
import users from "../data/users";
import dictionary from "@/data/dictionary";

export default {
  data() {
    return {
      usernameR: "",
      passwordR: "",
      nameR: "",
      surnameR: "",
      errorR: "",
      success: "",
      allUsers: [],
      language: "",
      dictionary,
    };
  },
  methods: {
    register() {
      if (
        this.usernameR == "" ||
        this.passwordR == "" ||
        this.nameR == "" ||
        this.surnameR == ""
      ) {
        if (this.language == "en") this.errorR = "All fields are required.";
        else this.errorR = "Sva polja su obavezna.";
        this.success = "";
        return;
      }

      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.allUsers[i].username == this.usernameR) {
          if (this.language == "en") this.errorR = "User already exists.";
          else this.errorR = "Korisnik vec postoji.";
          this.success = "";
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
      if (this.language == "en") this.success = "Succesfully registered.";
      else this.success = "Uspesna registracija.";
    },
  },
  created() {
    this.language = localStorage.getItem("language");

    if (localStorage.getItem("users") == null) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    this.allUsers = JSON.parse(localStorage.getItem("users"));
  },
};
</script>