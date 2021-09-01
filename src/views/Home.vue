<template>
  <div class="user">
    <h1 class="title">HelpmeChef.com</h1>
    <hr />
  </div>
</template>

<style>
.user {
  background: white;
  box-shadow: 0 0 5px #585858;
  transition: 0.3s;
  border-radius: 5px;
  width: 80vw;
  margin: auto;
  margin-top: 20px;
}

.title {
  font-family: cursive;
  color: darkseagreen;
  padding-top: 10px;
}
</style>

<script>
import users from '../data/users';
export default {
  name: 'Home',
  components: {
    
  },
  created(){
    if (localStorage.getItem('users') == null) {
      localStorage.setItem('users', JSON.stringify(users));
    }
    this.allUsers = JSON.parse(localStorage.getItem('users'));

    localStorage.setItem('language', 'en');
  }
}
</script>
