//= require knockout
//= require eod_updates_view_model
//= require eod_entry_category
//= require eod_entry

describe('EOD Entries', function() {
  var entryCategory;

  beforeEach(function() {
    var categoryEntries = {
      1: [{content: 'some eod content'}]
    };
    var eodUpdatesViewModel = new EodUpdatesViewModel(categoryEntries);

    entryCategory = eodUpdatesViewModel.entryCategories[1];
  });

  it('adds a new entry with the content of the AddContentTrigger', function() {
    entryCategory.addContentTrigger('new content');

    var entries = entryCategory.entries();
    expect(entries.length).to.equal(2);
    expect(entries[1].content()).to.equal('new content');
    expect(entries[1].isFocused()).to.equal(true);

    expect(entryCategory.addContentTrigger()).to.equal('');
  });

  it('removes the entry when it becomes blank', function() {
    entryCategory.addContentTrigger('new content');

    var entries = entryCategory.entries();
    entries[1].content('');

    expect(entries.length).to.equal(1);
    expect(entries[0].content()).to.equal('some eod content');
    expect(entries[0].isFocused()).to.equal(true);

    entries[0].content('');

    expect(entries.length).to.equal(1);
  });
});