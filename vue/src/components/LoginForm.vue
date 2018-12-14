<template>
  <div>
    <form @submit.prevent="authorize" class="login-form login-form--style">
      <h3 class="login-form__header">Авторизация</h3>
      <p class="par login-form__msg">{{ msg }}</p>
      <div class="login-form__input-wrapper">
        <label class="login-form__label login-form__label--style">
          Логин:
        </label>
        <input type="text" v-model="login"
               placeholder="Логин" class="login-form__input login-form__input--style">
      </div>
      <div class="login-form__input-wrapper">
        <label class="login-form__label login-form__label--style">
          Пароль:
        </label>
        <input type="password" v-model="password"
               placeholder="Пароль" class="login-form__input login-form__input--style">
      </div>
      <div class="login-form__button-wrapper">
        <input type="submit"
               value="Войти" class="login-form__button login-form__button--style">
      </div>
      <div class="login-form__register">
        У Вас нет аккаунта?
        <router-link to="/register" tag="a" class="link login-form__register-link">
          Зарегистрироваться
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          login: '',
          password: '',
          msg: '',
          resource: null
        }
      },
      props: {
        changeIsLogged: Function
      },
      methods: {
        authorize() {
          let login = this.login;
          let password = this.password;
          if (login && password) {
            this.resource = this.$resource('auth');
            this.resource.save({login, password}).then(
              function (response) {
                let data = response.data;
                if (this.validateData(data)) {
                  this.$cookie.set('auth', JSON.stringify({login, password}), 1);
                  this.$store.dispatch('loadPerson', data);
                  this.$props.changeIsLogged(true);
                } else {
                  this.msg = 'Ошибка! Неправильный логин или пароль';
                  let that = this;
                  setTimeout(function(){
                    that.msg = '';
                  }, 4000);
                }
              },
              function (error) {

              }
            );
          } else {
            this.msg = 'Пожалуйста заполните данные перед отправкой';
            let that = this;
            setTimeout(function(){
              that.msg = '';
            }, 4000);

          }
        },
        validateData(data) {
          if (data == false || ((typeof data) === "string" && data.localeCompare("false") === 0)
                  || data == [])
            return false;
          else return true
        }
      }
    }
</script>

<style scoped>
  .login-form {
    max-width: 400px;
    margin: 30px auto;
    padding: 10px 20px;
  }

  .login-form--style {
    border: 1px solid #0069ff;
  }

  .login-form__header {
    margin: 0;
    margin-top: 10px;
    text-align: center;
    font-size: 25px;
    border-bottom: 2px solid #0069ff;
    padding-bottom: 10px;
  }

  .login-form__label {
    min-width: 70px;
    display: inline-block;
    vertical-align: top;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 17px;
  }

  .login-form__input {
    border: 1px solid #000;
    box-sizing: border-box;
    padding: 8px 20px;
    width: 100%;
    outline: none;
    background: #f1f1f1;
    font-size: 18px;
  }

  .login-form__input:hover, .login-form__input:focus {
    background: #fff;
  }

  .login-form__input-wrapper {
    margin-bottom: 20px;
  }

  .login-form__button-wrapper {
    margin-bottom: 20px;
    text-align: center;
  }

  .login-form__button {
    outline: none;
    display: inline-block;
    vertical-align: top;
    padding: 8px 20px;
    min-width: 150px;
    cursor: pointer;
  }

  .login-form__button--style {
    background: #0069ff;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }

  .login-form__msg {
    text-align: center;
    color: #ff0000;
    font-size: 17px;
    padding: 0;
    margin: 0;
    padding-top: 10px;
    padding-bottom: 5px;
  }

  .login-form__register {
    border-top: 1px solid #000;
    padding-top: 10px;
    text-align: center;
  }

  .login-form__register-link {
    color: #0069ff;
    text-decoration: underline;
  }
</style>
