function Course(id = -1, name = '', description = '') {
    this.id = id;
    this.name = name;
    this.description = description;
}

Course.prototype.getName = function() {
  return this.name;
};

Course.prototype.getId = function() {
    return this.id;
};

Course.prototype.getDescription = function() {
    return this.description;
};

Course.prototype.setName = function(name) {
    this.name = name;
};

Course.prototype.setDescription = function(descr) {
    this.description = descr;
};

Course.prototype.setId = function(id) {
    this.id = id;
};

export default Course;