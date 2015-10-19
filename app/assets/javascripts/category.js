function Category(data) {
  var self = this;

  self.id = data.id;
  self.name = ko.observable(data.name);
  self.destroyMe = ko.observable(false);

  self.isNew = function() {
    return self.id == undefined;
  };

  self.inputName = function(index, attribute) {
    return 'team[categories_attributes]['+index+']['+attribute+']';
  };
}