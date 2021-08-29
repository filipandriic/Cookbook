<template>
  <div class="home">

  </div>
</template>

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
  }
}
</script>
