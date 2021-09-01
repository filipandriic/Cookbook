<template>
  <div>
    <div class="card" style="margin-top: 100px" v-if="loggedin === ''">
      <hr />
      <h2>
        <a :href="'/myaccount'">{{
          dictionary[language].pleaseLoginToAddRecipe
        }}</a>
      </h2>
      <hr />
    </div>

    <div class="addreceipt card" v-else>
      <h2 class="title">{{ dictionary[language].addRecipe }}</h2>
      <hr />
      <table>
        <tr>
          <td class="attributes">{{ dictionary[language].name }}:&nbsp;</td>
          <td class="left">
            <input type="text" class="input" name="" id="" v-model="name" />
          </td>
        </tr>
        <tr>
          <td class="attributes">{{ dictionary[language].group }}:&nbsp;</td>
          <td class="left">
            <select name="" class="input" id="" v-model="group">
              <option value="Appetizer">Appetizer</option>
              <option value="Main course">Main course</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="attributes">
            {{ dictionary[language].instructions }}:&nbsp;
          </td>
          <td class="left">
            <input
              v-on:change="uploadInstructions"
              type="file"
              id="myFile"
              name="filename"
              accept=".pdf"
            />
          </td>
        </tr>
        <tr>
          <td class="attributes">
            Images&nbsp;
          </td>
          <td class="left">
            <input
              v-on:change="uploadImages"
              type="file"
              id="myFile"
              multiple
              name="filename"
              accept=".png, .jpg, .jpeg"
            />
          </td>
        </tr>
        <tr>
          <td class="attributes">{{ dictionary[language].duration }}:&nbsp;</td>
          <td class="left">
            <input
              type="text"
              class="input"
              name=""
              id=""
              v-model="duration"
            />&nbsp;mins
          </td>
        </tr>
        <tr>
          <td class="attributes">
            {{ dictionary[language].difficulty }}:&nbsp;
          </td>
          <td class="left">
            <select name="" class="input" id="" v-model="difficulty">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </td>
        </tr>
        <br />
        <tr><td>
          <a :href="instructionsPDF" download>DOWNLOAD PDF</a>

          </td></tr>
        <tr><td>
          <img v-for="(image, index) in images" :key="index" :src="image" />
          </td></tr>
        <tr>
          <td colspan="2">
            <button @click="addReceipt" class="button">
              {{ dictionary[language].addRecipe }}
            </button>
          </td>
        </tr>
      </table>
      <span style="color: red">{{ this.error }}</span>
      <span style="color: green">{{ this.success }}</span>
    </div>
  </div>
</template>

<style>
table {
  margin: auto;
}

.left {
  text-align: left;
}

.card {
  background: white;
  box-shadow: 0 0 5px #585858;
  transition: 0.3s;
  border-radius: 5px;
  width: 30%;
  margin: auto;
  margin-top: 120px;
  margin-bottom: 20px;
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

.input {
  border-radius: 7px;
}

.button {
  margin-top: 30px;
  margin-bottom: 10px;
  color: floralwhite;
  background-color: darkseagreen;
  border-radius: 10px;
  width: 170px;
  font-size: 19px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>

<script>
import dictionary from "@/data/dictionary";

export default {
  data() {
    return {
      loggedin: "",
      name: "",
      group: "",
      instructions: "",
      duration: "",
      difficulty: "",
      error: "",
      success: "",
      receipts: [],
      language: "",
      dictionary,
      instructionsPDF: "",
      images: [],
    };
  },
  methods: {
    uploadInstructions(event) {
      const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.instructionsPDF = reader.result;
        }
        reader.onerror = (error) => reject(error);
    },
    uploadImages(event) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.images = [...this.images, reader.result]
        }
        reader.onerror = (error) => reject(error);
      }
    },
    addReceipt() {
      if (
        this.name == "" ||
        this.group == "" ||
        this.instructions == "" ||
        this.duration == "" ||
        this.difficulty == ""
      ) {
        if (this.language == "en") this.error = "All fields are required.";
        else this.error = "Sva polja su obavezna";
        return;
      }

      for (let i = 0; i < this.receipts.length; i++) {
        if (
          this.receipts[i].name == this.name &&
          this.receipts[i].user == this.loggedin.username
        ) {
          if (this.language == "en")
            this.error = "You already added receipt for this meal.";
          else this.error = "Vec ste dodali recept za ovaj obrok.";
          this.success = "";
          return;
        }
      }

      let receipt = {
        name: this.name,
        group: this.group,
        instructions: this.instructions,
        duration: this.duration,
        difficulty: this.difficulty,
        user: this.loggedin.username,
      };

      this.error = "";
      if (this.language == "en") this.success = "Added recipe";
      else this.success = "Dodali ste recept";
      this.receipts.push(receipt);
      localStorage.setItem("receipts", JSON.stringify(this.receipts));
      this.error = "";
    },
  },
  created() {
    this.language = localStorage.getItem("language");

    if (sessionStorage.getItem("user") != null) {
      this.loggedin = JSON.parse(sessionStorage.getItem("user"));
      if (this.loggedin == "register") this.loggedin = "";
    } else this.loggedin = "";

    if (localStorage.getItem("receipts") == null) this.receipts = [];
    else this.receipts = JSON.parse(localStorage.getItem("receipts"));
  },
};
</script>