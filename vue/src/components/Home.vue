<template>
    <div class="home">

      <login-form v-if="!isLogged" :changeIsLogged="changeIsLogged"></login-form>

      <div v-else class="home-content">

          <organization-home v-if="!isRoleUser"></organization-home>
          <div v-else>Role User</div>

      </div>

    </div>
</template>

<script>
  import LoginForm from './LoginForm'
  import roles from '../values/roles.json'
  import OrganizationHome from './OrganizationHome'
    export default {
      data() {
        return {
          isLogged: false
        }
      },
      components: {
        loginForm: LoginForm,
        organizationHome: OrganizationHome
      },
      methods: {
        changeIsLogged(value) {
          this.isLogged = value;
        }
      },
      computed: {
        role() {
          if (this.$store.getters.getRole.toLowerCase().localeCompare(roles.roleAdmin.toLowerCase()) === 0)
            return "Аккаунт Организации";
          else return "Аккаунт Пользователя";
        },
          isRoleUser() {
              if (this.$store.getters.getRole.toLowerCase().localeCompare(roles.roleAdmin.toLowerCase()) === 0)
                  return false;
              else return true;
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
