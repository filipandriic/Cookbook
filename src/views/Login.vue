<template>
    <div class="container">
        <div class="row h-100">
            <div class="col-sm-4 offset-4 vertical-center">
                <div class="card card-block login-card">
                    <br>
                    
                    <input type="text" name="username" id="username" class="input rounded-lg" v-model="username">
                    <label for="username">Username</label>

                    <input type="password" name="password" id="password" class="input rounded-lg" v-model="password">
                    <label for="password">Password</label>

                    <br>
                    
                    <button class="btn btn-light rounded-lg" type="submit" @click="login">Login</button>
                    <span style="color: red">{{this.error}}</span>
                                        
                    <br>

                    <label for="register">Don't have an account?</label>
                    <button class="btn btn-light rounded-lg" type="button">Sign Up</button>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .card {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color: whitesmoke;
        margin: 0 auto;
        background-image: linear-gradient(rgb(58, 216, 208), rgb(135, 206, 250));
        border-radius: .75rem!important;
        border: 3px solid lightgray;
    }
    .login-card {
        align-items: center;
        width: 350px;
    }
    .btn {
        width: 33%;
    }
    .input {
        width: 250px;
        height: 40px;
    }
</style>

<script>
import users from '../data/users';
export default {
  name: 'Login',
  components: {
    
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
      allUsers: []
    }
  },
  methods: {
    login() {
        if (this.username == "") {
            this.error = "Username is required.";
            return;
        }

        if (this.password == "") {
            this.error = "Password is required.";
            return;
        }

        for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].username == this.username && this.allUsers[i].password == this.password) {
                this.$router.push('/');
            }
        }
        this.error = "Invalid username or password."
    }
  },
  created(){
    if (localStorage.getItem('users') == null) {
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      this.allUsers = JSON.parse(localStorage.getItem('users'));
    }
  }
}
</script>