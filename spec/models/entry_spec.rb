require 'rails_helper'

describe Entry do
  describe '.mark_as_delivered' do
    let!(:deliver_these) { [FactoryGirl.create(:entry), FactoryGirl.create(:entry)] }
    let!(:do_not_deliver) { FactoryGirl.create(:entry) }

    before do

    end

    it 'marks only the given entries as delivered' do
      Entry.mark_as_delivered(deliver_these)

      expect(Entry.where(delivered: true)).to contain_exactly(*deliver_these)
      expect(Entry.where(delivered: false)).to contain_exactly(*do_not_deliver)
    end
  end
end