FactoryGirl.define do
  factory :entry do
    author { Faker::Name.first_name }
    content { Faker::Lorem.sentence }
    delivered false

    category_id 0

    before(:create) do |entry|
      entry.team = FactoryGirl.create(:team) if entry.team.nil?
    end
  end

  factory :delivered_entry, parent: :entry do
    delivered true
  end
end