//= require knockout
//= require categories_view_model
//= require category

describe('Categories', function() {
  it('removes a newly added category', function() {
    var categoriesViewModel = new CategoriesViewModel([]);

    categoriesViewModel.addCategory();

    var categories = categoriesViewModel.categories();
    expect(categories.length).to.equal(1);
    expect(categories[0].isNew()).to.equal(true);

    categoriesViewModel.removeCategory(categories[0]);

    expect(categories.length).to.equal(0);
  });

  it('marks an existing category for deletion', function() {
    var existingCategories = [{id: 1, name: 'Some Category'}];
    var categoriesViewModel = new CategoriesViewModel(existingCategories);

    var categories = categoriesViewModel.categories();
    expect(categories.length).to.equal(1);
    expect(categories[0].destroyMe()).to.equal(false);

    categoriesViewModel.removeCategory(categories[0]);

    expect(categories.length).to.equal(1);
    expect(categories[0].destroyMe()).to.equal(true);
  });
});