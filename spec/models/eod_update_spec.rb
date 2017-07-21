require 'rails_helper'

describe EodUpdate do
  def attribute_from(entries, attribute)
    entries.map(&attribute)
  end

  describe '.build' do
    let(:content_by_category) do
      {
        '1' => [{'content' => 'first update'}, {'content' => 'second update'}],
        '2' => [{'content' => 'third update'}],
        '3' => [{'content' => ''}]
      }
    end

    it 'initializes an EOD Update from form params' do
      eod_update = EodUpdate.build('author', content_by_category, 10)

      expect(eod_update.author).to eq('author')

      expect(attribute_from(eod_update.entries, :author).uniq).to contain_exactly('author')
      expect(attribute_from(eod_update.entries, :content)).to contain_exactly('first update', 'second update', 'third update', '')
      expect(attribute_from(eod_update.entries, :category_id)).to contain_exactly(1, 1, 2, 3)
      expect(attribute_from(eod_update.entries, :team_id).uniq).to contain_exactly(10)
    end
  end
end
