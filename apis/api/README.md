# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version (installer https://www.ruby-lang.org/en/downloads/)
ruby -v

* System dependencies
gem install bundler
gem install rails --no-ri --no-rdoc -v 5.1.0
bundle install <-- If you're on windows, you need to open a terminal as administrator (cmd or git bash) in order to run this command.

* For windows 10 use:
gem install --platform ruby tiny_tds

* Configuration

* Database creation

* Database initialization

* How to run the test suite
rails s

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
sudo lsof -i -n :1337
kill <PID>
rails s&
* ...
