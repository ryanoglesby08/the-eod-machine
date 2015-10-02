require 'rails_helper'

describe Entry do
  describe '.mark_as_delivered' do
    let!(:entries) do
      [
        Entry.create(author: 'Freddy', content: 'Undelivered entry 1'),
        Entry.create(author: 'Freddy', content: 'Undelivered entry 2')
      ]
    end

    before do
      Entry.create(author: 'Freddy', content: 'Undelivered entry 3')
    end

    it 'marks only the given entries as delivered' do
      Entry.mark_as_delivered(entries)

      expect(Entry.where(delivered: true)).to contain_exactly(*entries)
    end
  end
end