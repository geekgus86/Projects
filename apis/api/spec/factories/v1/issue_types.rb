FactoryBot.define do
  factory :issue_type do
    # add Faker issue information
    DescIssueType { Faker::Types.rb_string }
    ShortDesc { Faker::Internet.username(3) }
    RealDown { Faker::Number.between(0, 60) }
    Affect { Faker.Number.between(0, 10.0) }
    Color { Faker::Color.hex_color }
    Active { true }
  end
end
