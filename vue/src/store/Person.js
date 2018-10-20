import Person from './entities/person'
let defaultPerson = new Person();

export default {

  state: {
    person: defaultPerson,
    companyName: '',
    companyDescription: '',
    companySpecialization: '',
    companyId: ''
  },
  getters: {
    getEmail(state) {
      return state.person.getEmail();
    },
    getId(state) {
      return state.person.getId();
    },
    getRole(state) {
      return state.person.getRole();
    },
    getLogin(state) {
      return state.person.getLogin();
    },
    getPassword(state) {
      return state.person.getPassword();
    },
    getCurrentPerson(state) {
      return state.person;
    }
  },
  mutations: {
    updatePerson(state, person) {
      state.person = person;
    },
    setCompanyName(state, name) {
      state.companyName = name;
    },
    setCompanyDescription(state, description) {
      state.companyDescription = description;
    },
    setCompanySpecialization(state, specializaiton) {
      state.companySpecialization = specializaiton;
    },
    setCompanyId(state, id) {
      state.companyId = id;
    }
  },
  actions: {
    loadPerson(context, payload) {

      let personData = payload;
      let person = null;

      if (personData.hasOwnProperty('head')) {
        context.commit('setCompanyName', personData.name);
        context.commit('setCompanyDescription', personData.description);
        context.commit('setCompanySpecialization', personData.specialization);
        context.commit('setCompanyId', personData.id);
        person = new Person(personData.head.login, personData.head.password, personData.head.id,
          personData.head.email, personData.head.role);
      }
      else person = new Person(personData.login,personData.password,personData.id,personData.email,personData.role);
      context.commit('updatePerson', person);
    }
  }

};
