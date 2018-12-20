function Group(id = -1, name = "") {
    this.id = id;
    this.name = name;
}

Group.prototype.getId = function() {
    return this.id;
};

Group.prototype.getName = function () {
    return this.name;
};

Group.prototype.setId = function (id) {
    this.id = id;
};

Group.prototype.setName = function (name) {
  this.name = name;
};

export default Group;