p "Start destroying"

User.destroy_all
Product.destroy_all
Tag.destroy_all

p "Finish destroying"
p "_________________"

i = 0

10.times do
  i += 1
  p "Generating user##{i}"
  user = User.create(email: Faker::Internet.email(Faker::RickAndMorty.character), password: "azerty")
  10.times do
    product = Product.new
    product.title = Faker::Commerce.product_name
    product.price = rand(1000)
    product.description = Faker::Hipster.sentence
    product.user = user
    product.save
  end
end
