RSpec::Matchers.define :be_one_of do |*expected|
  expected = [expected].flatten

  match do |actual|
    expected.include?(actual)
  end
end