function Person(login = '', password = '', id = -1, email = '', role = '') {
  this.login = login;
  this.password = password;
  this.id = id;
  this.email = email;
  this.role = role;
}

Person.prototype.getLogin = function() {
  return this.login;
};

Person.prototype.getPassword = function() {
  return this.password;
};

Person.prototype.getId = function() {
  return this.id;
};

Person.prototype.getCurrentEmail = function() {
  return this.email;
};

Person.prototype.getCurrentRole = function() {
  return this.role;
};

Person.prototype.setLogin = function(login) {
  this.login = login;
};

Person.prototype.setPassword = function(password) {
  this.password = password;
};

Person.prototype.setId = function(id) {
  this.id = id;
};

Person.prototype.setEmail = function(email) {
  this.email = email;
};

Person.prototype.setRole = function(role) {
  this.role = role;
};

export default Person;
