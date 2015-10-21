FactoryGirl.define do
  factory :category do
    name { Faker::Book.title }
  end
end