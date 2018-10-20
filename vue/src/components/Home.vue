<template>
    <div class="home">

      <login-form v-if="!isLogged" :changeIsLogged="changeIsLogged"></login-form>

      <div v-else class="home-content">

      {{ role }}

      </div>

    </div>
</template>

<script>
  import LoginForm from './LoginForm'
  import roles from '../values/roles.json'
    export default {
      data() {
        return {
          isLogged: false
        }
      },
      components: {
        loginForm: LoginForm
      },
      methods: {
        changeIsLogged(value) {
          this.isLogged = value;
        }
      },
      computed: {
        role() {
          console.log("Storage: "+this.$store.getters.getRole);
          console.log("Name: "+roles.roleAdmin);
          console.log("Compare: "+this.$store.getters.getRole.toLowerCase().localeCompare(roles.roleAdmin.toLowerCase()));
          if (this.$store.getters.getRole.toLowerCase().localeCompare(roles.roleAdmin.toLowerCase()) === 0)
            return "Аккаунт Организации";
          else return "Аккаунт Пользователя"
        }
      },
      created() {
        let auth = this.$cookie.get('auth');
        if (auth) {
          this.isLogged = true;
        }
      }
    }
</script>

<style scoped>

  .home-content {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

</style>
