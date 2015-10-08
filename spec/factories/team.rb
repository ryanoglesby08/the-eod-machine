FactoryGirl.define do
  factory :team do
    name { Faker::Team.name }
    mailing_list { Faker::Internet.safe_email }
  end
end