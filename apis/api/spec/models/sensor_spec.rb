require 'rails_helper'

RSpec.describe Sensor, type: :model do
  it 'has many values' do
    association = described_class.reflect_on_association :sensor_values
    expect(association.macro).to eq :has_many
  end

  it 'belongs to a type' do
    association = described_class.reflect_on_association :sensor_type
    expect(association.macro).to eq :belongs_to
  end
end
