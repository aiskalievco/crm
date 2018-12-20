import Person from './entities/person'
let defaultPerson = new Person();
import Course from './entities/Course'
import Group from "./entities/Group";

export default {

  state: {
    person: defaultPerson,
    companyName: '',
    companyDescription: '',
    companySpecialization: '',
    companyId: 1,
    courses: [],
    groups: []
  },
  getters: {
    getEmail(state) {
      return state.person.email;
    },
    getId(state) {
      return state.person.id;
    },
    getRole(state) {
      return state.person.role;
    },
    getLogin(state) {
      return state.person.login;
    },
    getPassword(state) {
      return state.person.password;
    },
    getCurrentPerson(state) {
      return state.person;
    },
    getCourses(state) {
      return state.courses;
    },
    getCompanyId(state) {
      return state.companyId;
    },
    getGroups(state) {
      return state.groups;
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
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
    setGroups(state, groups) {
      state.groups = groups;
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

        let courses = [];

        personData.courses.forEach(function(course, ind) {
          let tmpCourse = new Course(course.id, course.name, course.description);
          courses.push(tmpCourse);
        });

        context.commit('setCourses', courses);

      }
      else {
        person = new Person(personData.login,personData.password,personData.id,personData.email,personData.role);
        let groups = [];

        personData.groups.forEach(function(group, ind) {
          let tmpGroup = new Group(group.id, group.name);
          tmpGroup.course = new Course(group.course.id, group.course.name, group.course.description);
          groups.push(tmpGroup);
        });

        context.commit('setGroups', groups);
      }

      context.commit('updatePerson', person);
    }
  }

};
