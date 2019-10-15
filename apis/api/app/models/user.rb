class User < ApplicationRecord
  has_secure_password

  self.table_name = 'admin.User'

  before_create :sanitize_email
  has_many :user_has_issue_types, foreign_key: 'user_id'
  has_many :issue_types, through: :user_has_issue_types
  belongs_to :team, :class_name => "AdminTeam", foreign_key: 'TeamID', optional: true
  # has_many :teams, foreign_key: 'TeamLeaderID'
  has_many :groups, foreign_key: 'GroupLeaderID'
  has_many :check_lists, foreign_key: 'UserID'
  belongs_to :locale, foreign_key: 'LocaleID', optional: true
  #belongs_to :role

  private

  def sanitize_email
    self.email = self.email.delete(' ').downcase
  end
end
