<template>
  <div id="nav">
    <div class="row">
      <table class="NavigationTable">
        <div class="NavigationTable__home">
          <router-link to="/"
            ><img src="../assets/home.png" alt="" />&nbsp; {{ dictionary[language].home_link }}</router-link
          >
        </div>
        <div class="NavigationTable__otherLinks">
          <div>
            <router-link to="/receipts"
              ><img src="../assets/receipts.png" alt="" />&nbsp;
              Recipes</router-link
            >
          </div>
          <div>
            <router-link to="/addreceipt"
              ><img src="../assets/add.png" alt="" />&nbsp;Add
              Recipe</router-link
            >
          </div>
          <div>
            <router-link to="/myaccount"
              ><img src="../assets/user.png" alt="" />&nbsp;My
              Account</router-link
            >
          </div>
          <div>
            <router-link to="/aboutus"
              ><img src="../assets/about.png" alt="" />&nbsp;About
              Us</router-link
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


.NavigationTable__otherLinks {
  display: flex;
  align-items: center;
  width: 60%;
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
</style>

<script>
import dictionary from '@/data/dictionary';

export default {
  name: "Navigation",
  data() {
    return {
      dictionary,
    }
  },
  props: ['language']
};
</script>