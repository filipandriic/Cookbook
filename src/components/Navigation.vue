<template>
  <div id="nav">
    <div class="row">
      <table class="NavigationTable">
        <div class="NavigationTable__home">
          <router-link class="title" to="/"
            ><img src="../assets/home.png" alt="" />&nbsp;
            <div>{{ dictionary[language].home }}</div></router-link
          >
        </div>

        <div class="NavigationTable__otherLinks">
          <div class="languageslide">
          <b>English &nbsp;</b>
          <div class="slidecontainer" @click="changeLanguage">
            <input
              type="range"
              min="1"
              max="2"
              v-model="sliderValue"
              class="slider"
              id="myRange"
            />
          </div>
          <b>&nbsp;Srpski</b>
        </div>
          <div>
            <router-link to="/receipts"
              ><img src="../assets/receipts.png" alt="" />&nbsp;
              {{ dictionary[language].recipes }}</router-link
            >
          </div>
          <div>
            <router-link to="/addreceipt"
              ><img src="../assets/add.png" alt="" />&nbsp;{{
                dictionary[language].addRecipe
              }}
            </router-link>
          </div>
          <div>
            <router-link to="/myaccount"
              ><img src="../assets/user.png" alt="" />&nbsp;{{
                dictionary[language].myAccount
              }}</router-link
            >
          </div>
          <div>
            <router-link to="/aboutus"
              ><img src="../assets/about.png" alt="" />&nbsp;{{
                dictionary[language].aboutUs
              }}</router-link
            >
          </div>
        </div>
      </table>
    </div>
  </div>
</template>

<style>
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.NavigationTable {
  background: white;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  justify-content: space-between;
}

.NavigationTable__home {
  margin-left: 50px;
}

.title {
  color: darkseagreen;
}

.NavigationTable__otherLinks {
  display: flex;
  align-items: center;
  width: 70%;
  justify-content: space-between;
  height: 100%;
  margin-right: 45px;
}

#nav img {
  width: 30px;
}

#nav a.router-link-exact-active {
  color: rgb(78, 185, 252);
}

.languageslide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slidecontainer {
  width: 20%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #eeeeee; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  border-radius: 5px;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: darkseagreen;
  cursor: pointer; /* Cursor on hover */
  border-radius: 5px;
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: darkseagreen;
  cursor: pointer; /* Cursor on hover */
}

</style>

<script>
import dictionary from "@/data/dictionary";

export default {
  name: "Navigation",
  data() {
    return {
      dictionary,
      language: "",
      sliderValue: ""
    };
  },
  methods: {
    changeLanguage() {
      this.sliderValue = document.getElementById("myRange").value;
      if (this.sliderValue == "1") {
        localStorage.setItem('language', 'en');
      } else {
        localStorage.setItem('language', 'sr');
      }
      this.$router.go();
    }
  },
  created() {
    this.language = localStorage.getItem("language");
    if (this.language == "en")
      this.sliderValue = "1";
    else
      this.sliderValue = "2";
  },
};
</script>