<template>
  <div>

    <div v-if="isDefault" class="registration-default">
      <h2 class="registration-default__header">Выберите тип аккаунта</h2>

      <div class="registration-default__wrapper">
        <div class="registration-default__block">
          <button @click="chooseType(false)" class="registration-default__button">Пользователь</button>
        </div>
        <div class="registration-default__block">
          <button @click="chooseType(true)" class="registration-default__button">Организация</button>
        </div>
      </div>
    </div>

    <div v-else class="registration-form">

      <div v-if="!isDefault" class="registration-form__control">
        <button @click="returnBack" class="registration-form__button">Вернуться</button>
      </div>

      <form @submit.prevent="register" class="login-form login-form--style">
        <h3 class="login-form__header">Регистрация {{ registerName }}</h3>
        <p class="par login-form__msg">{{ msg }}</p>
        <div class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            Логин:
          </label>
          <input type="text" v-model="login" required
                 placeholder="Логин" class="login-form__input login-form__input--style">
        </div>
        <div class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            Пароль:
          </label>
          <input type="password" v-model="password" required
                 placeholder="Пароль" class="login-form__input login-form__input--style">
        </div>
        <div class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            Пароль еще раз:
          </label>
          <input type="password" v-model="repeatedPassword" required
                 placeholder="Пароль еще раз" class="login-form__input login-form__input--style">
        </div>
        <div class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            E-mail:
          </label>
          <input type="email" v-model="email" required
                 placeholder="Email" class="login-form__input login-form__input--style">
        </div>
        <div v-if="isCompany" class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            Название организации:
          </label>
          <input type="text" v-model="companyName" required
                 placeholder="Название организации" class="login-form__input login-form__input--style">
        </div>
        <div v-if="isCompany" class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            Описание организации:
          </label>
          <textarea v-model="description" required rows="4"
                 placeholder="Описание организации" class="login-form__input login-form__input--style">
          </textarea>
        </div>
        <div v-if="isCompany" class="login-form__input-wrapper">
          <label class="login-form__label login-form__label--style">
            Специализация организации:
          </label>
          <select v-model="specialization" required class="login-form__input login-form__input--style">
            <option value="education">Учебное заведение</option>
            <option value="beauty">Салоны красоты</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <div class="login-form__button-wrapper">
          <input type="submit"
                 value="Зарегистрироваться" class="login-form__button login-form__button--style">
        </div>
      </form>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isDefault: true,
        isCompany: false,
        login: '',
        password: '',
        repeatedPassword: '',
        email: '',
        msg: '',
        companyName: '',
        description: '',
        specialization: '',
        resource: null
      };
    },
    methods: {
      register() {
        let pass = this.password;
        let repeatedPass = this.repeatedPassword;
        if (this.checkPassword(pass, repeatedPass)) {
          let dataToPass = {
            login: this.login,
            password: this.password,
            email: this.email,
          };

          let url = 'reg';
          if (this.isCompany) {
            url = 'organizationreg';
            dataToPass.name = this.companyName;
            dataToPass.description = this.description;
            dataToPass.specialization = this.specialization;
          }

          this.resource = this.$resource(url);
          this.resource.save(dataToPass).then(function(){
            this.$router.push('/');
          }, function(error){
            console.log(error);});
        } else {
          this.msg = 'Ваши пароли не совпадают';
          let that = this;
          setTimeout(function(){
            that.msg = '';
          }, 4000);
        }
      },
      checkPassword(password, repeat) {
        if (password.toString().toLowerCase().localeCompare(repeat.toString().toLowerCase()) === 0)
          return true;
        else return false;
      },
      chooseType(isCompany) {
        this.isCompany = isCompany;
        this.isDefault = false;
      },
      returnBack() {
        this.isCompany = false;
        this.isDefault = true;
      }
    },
    computed: {
      registerName() {
        if (this.isCompany)
          return "Организации";
        else return 'Пользователя';
      }
    }
  }
</script>

<style scoped>

  .registration-default {
    max-width: 500px;
    margin: 0 auto;
  }

  .registration-default__header {
    text-align: center;
    font-size: 30px;
    margin: 0;
    margin-bottom: 20px;
  }

  .registration-default__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .registration-default__block {
    width: 50%;
  }

  .registration-default__block:first-child {
    margin-right: 40px;
  }

  .registration-default__button {
    outline: none;
    width: 100%;
    border: 1px solid #000;
    font-size: 25px;
    font-weight: bold;
    padding: 20px;
    background: #f1f1f1;
    cursor: pointer;
  }
  
  .registration-default__button:hover {
    background: #0069ff;
    color: #fff;
  }

  .registration-form__control {
    max-width: 440px;
    margin: 0 auto;
  }

  .registration-form__button {
    cursor: pointer;
    outline: none;
    padding: 10px;
    background: #0069ff;
    color: #fff;
    font-size: 16px;
  }

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

  .login-form__date {
    padding: 5px;
    border: 1px solid #000;
    box-sizing: border-box;
    outline: none;
    background: #f1f1f1;
  }

  .login-form__date:hover {
    background: #fff;
  }

  .login-form__date:focus {
    background: #fff;
  }
</style>
