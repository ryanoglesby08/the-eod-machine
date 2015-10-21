FactoryGirl.define do
  factory :team do
    name { Faker::Team.name }
    mailing_list { Faker::Internet.safe_email }

    transient do
      category_names []
    end

    categories { [category_names].flatten.map { |category_name| FactoryGirl.build(:category, name: category_name) } }
  end
end