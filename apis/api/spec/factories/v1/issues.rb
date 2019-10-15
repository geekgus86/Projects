FactoryBot.define do
  factory :issue do
    # add Faker issue information
    DescIssue { Faker::HowIMetYourMother.catch_phrase }
    DTCode { Faker::Code.nric }
    COCode { Faker::Code.nric }
    association :issue_type, factory: :issue_type
  end
end
