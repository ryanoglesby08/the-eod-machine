function EodUpdatesViewModel(rawEntriesByCategory) {
  var self = this;

  self.entryCategories = initializeEntryCategories(rawEntriesByCategory);

  function initializeEntryCategories(entriesByCategory) {
    var entryCategories = {};

    for(var categoryId in entriesByCategory) {
      if( entriesByCategory.hasOwnProperty(categoryId)) {
        entryCategories[categoryId] = new EodEntryCategory(entriesByCategory[categoryId]);
      }
    }

    return entryCategories;
  }
}