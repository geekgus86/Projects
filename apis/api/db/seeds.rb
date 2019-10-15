# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
# role = Role.create(description: 'Super Admin')
# quality_role = Role.create(description: 'Quality')
# User.create(email: 'necho', username: 'necho', name: 'Emmanuel Montes', password: 'necho', password_confirmation: 'necho', role: role)
User.create(email: 'carlos', username: 'carlos', name: 'carlos', password: 'carlos', password_confirmation: 'carlos', role: Role.find(1))
# User.create(email: 'mtesting', username: 'mtesting', name: 'Usuario de prueba', password: 'mtesting', password_confirmation: 'mtesting', role: Role.find(1))
