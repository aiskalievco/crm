<template>
    <div class="home">

      <login-form v-if="!isLogged" :changeIsLogged="changeIsLogged"></login-form>

      <div v-else class="home-content">

          <div class="home-content__menu">
              <div class="home-content__exit-wrapper">
                  <a @click.prevent="exit" class="link home-content__exit">Exit</a>
              </div>
          </div>

          <organization-home v-if="!isRoleUser"></organization-home>
          <user-home v-else></user-home>

      </div>

    </div>
</template>

<script>
  import LoginForm from './LoginForm'
  import roles from '../values/roles.json'
  import OrganizationHome from './OrganizationHome'
  import UserHome from './UserHome'
    export default {
      data() {
        return {
          isLogged: false
        }
      },
      components: {
        loginForm: LoginForm,
        organizationHome: OrganizationHome,
        userHome: UserHome
      },
      methods: {
        changeIsLogged(value) {
          this.isLogged = value;
        },
        exit() {
            this.$cookie.delete('auth');
            this.isLogged = false;
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
    .link {
        text-decoration: none;
        color: inherit;
    }

    .home-content__menu {
        display: flex;
        justify-content: flex-end;
    }

    .home-content__exit-wrapper {
        width: 100px;
    }

    .home-content__exit {
        font-weight: normal;
        font-size: 18px;
        background: #0069ff;
        width: 100%;
        display: block;
        color: white;
        padding: 10px 5px;
        box-sizing: border-box;
        border-radius: 20px;
        cursor: pointer;
    }

</style>
