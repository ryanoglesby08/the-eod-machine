function EodEntryCategory(rawEntries) {
  var self = this;

  var lastEntry = function() {
    return self.entries()[self.entries().length - 1];
  };

  var onEodEntryContentEmpty = function (entry) {
    if (self.entries().length === 1) {
      return;
    }

    self.entries.remove(entry);
    lastEntry().isFocused(true);
  };

  self.entries = ko.observableArray(
    rawEntries.map(function (rawEntry) { return new EodEntry(rawEntry, onEodEntryContentEmpty); })
  );

  self.addContentTrigger = ko.observable('');
  self.addContentTrigger.subscribe(function (newContent) {
    if (newContent === '' || newContent === undefined) {
      return;
    }

    self.addContentTrigger('');

    var eodEntry = new EodEntry({content: newContent}, onEodEntryContentEmpty);
    eodEntry.isFocused(true);
    self.entries.push(eodEntry);
  });

  self.hasSomeContent = ko.pureComputed(function() {
    var lastEntryContent = lastEntry().content();
    return lastEntryContent !== "" && lastEntryContent !== null && lastEntryContent !== undefined;
  });
}