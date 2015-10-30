function Category(data) {
  var self = this;

  self.id = data.id;
  self.name = ko.observable(data.name);
  self.errors = data.errors || {};
  self.destroyMe = ko.observable(false);

  self.isNew = function() {
    return self.id === undefined;
  };

  self.inputName = function(index, attribute) {
    return 'team[categories_attributes]['+index+']['+attribute+']';
  };

  self.classNameFor = function(field) {
    return self.errors[field] === undefined ? '' : 'field_with_errors';
  }
}