FactoryGirl.define do
  factory :entry do
    author Faker::Name.first_name
    content Faker::Lorem.sentence
    delivered false

    team_id 0
    category_id 0
  end

  factory :delivered_entry, parent: :entry do
    delivered true
  end
end