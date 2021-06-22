<template>
    <div id="nav" class="text-center container">
      <div class="row">
        <div class="col">
          <table class="table table-active">
            <tr>
              <td><router-link to="/"><img src="../assets/logo.png" alt="">Home</router-link></td>
              <td><router-link to="/receipts">Receipts</router-link></td>
              <td><router-link to="/addreceipt">Add Receipt</router-link></td>
              <td><router-link to="/myaccount">My Account</router-link></td>
              <td><router-link to="/aboutus">About Us</router-link></td>
            </tr>
          </table>
        </div>
      </div>
      
    </div>
</template>

<style>
    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }

    #nav img {
      width: 50px;
    }

    #nav table.td {
      display: flex;
      justify-content: center;
    }

    #nav a.router-link-exact-active {
      color: #42b983;
    }
</style>

<script>
  export default {
    name: 'Navigation'
  }
</script>