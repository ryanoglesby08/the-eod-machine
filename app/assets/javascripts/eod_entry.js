function EodEntry(rawEntry, onContentEmpty) {
  var self = this;

  self.content = ko.observable(rawEntry.content);
  self.isFocused = ko.observable(false);

  self.content.subscribe(function(newContent) {
    if( newContent === '') {
      onContentEmpty(self);
    }
  });
}