function CategoriesViewModel(rawCategories) {
  var self = this;

  self.categories = ko.observableArray(categoriesFrom(rawCategories));

  self.addCategory = function() {
    self.categories.push(new Category({}));
  };

  self.removeCategory = function(category) {
    if( category.isNew() ) {
      self.categories.remove(category);
    }
    else {
      category.destroyMe(true);
    }
  };

  function categoriesFrom(rawCategories) {
    return rawCategories.map(function(category) { return new Category(category); });
  }
}