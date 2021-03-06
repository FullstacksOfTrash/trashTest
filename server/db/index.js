const conn = require('./conn');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Review = require('./models/Review');
const User = require('./models/User');

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.hasMany(LineItem);
LineItem.belongsTo(Product);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);

Product.belongsTo(Category)

Category.belongsToMany(Product, { through: 'productTable' });
Product.belongsToMany(Category, { through: 'productTable' });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, harry, jarret, cang, zi] = await Promise.all([
    User.create({
      firstName: 'Moe',
      lastName: 'lastNamePlaceholder',
      email: 'moe@moe.com',
      password: 'MOE',
      address: 'addressPlaceholder',
      // admin: false // ensure this is false by default
    }),
    User.create({
      firstName: 'Harry',
      lastName: 'Chen',
      email: 'harry@harry.com',
      password: 'HARRY',
      address: 'Harry Street',
      admin: true,
    }),
    User.create({
      firstName: 'Jarret',
      lastName: 'Rose',
      email: 'jarret@jarret.com',
      password: 'JARRET',
      address: 'Jarret Street',
      admin: true,
    }),
    User.create({
      firstName: 'Cang',
      lastName: 'Truong',
      email: 'cang@cang.com',
      password: 'CANG',
      address: 'Cang Street',
      admin: true,
    }),
    User.create({
      firstName: 'Zi',
      lastName: 'Yan',
      email: 'zi@zi.com',
      password: 'ZI',
      address: 'Zi Street',
      admin: true,
    }),
  ]);
  const [order1, order2, order3, order4, order5, order6] = await Promise.all([
    Order.create({
      status: 'CART',
      userId: moe.id,
    }),
    Order.create({
      status: 'ORDER',
      userId: moe.id,
    }),
    Order.create({
      status: 'CART',
      userId: harry.id,
    }),
    Order.create({
      status: 'CART',
      userId: jarret.id,
    }),
    Order.create({
      status: 'CART',
      userId: cang.id,
    }),
    Order.create({
      status: 'CART',
      userId: zi.id,
    }),
  ]);
  const [computers, tablets, phones, onSale] = await Promise.all([
    Category.create({ name: 'Computers' }),
    Category.create({ name: 'Tablets' }),
    Category.create({ name: 'Phones' }),
    Category.create({ name: 'On Sale' }),
  ]);
  const [macbook, macbookPro, ipad, ipadPro, iphone] = await Promise.all([
    Product.create({
      name: 'Macbook',
      price: 100,
      imageUrl: '',
      stock: 200,
      description: 'description placeholder',
    }),
    Product.create({
      name: 'Macbook Pro',
      price: 25,
      imageUrl: '',
      stock: 300,
      description: 'description placeholder',
    }),
    Product.create({
      name: 'iPad',
      price: 50,
      imageUrl: '',
      stock: 200,
      description: 'description placeholder',
    }),
    Product.create({
      name: 'iPad Pro',
      price: 100,
      imageUrl: '',
      stock: 200,
      description: 'description placeholder',
    }),
    Product.create({
      name: 'iPhone',
      price: 300,
      imageUrl: '',
      stock: 200,
      description: 'description placeholder',
    }),
    Product.create({
      name: 'Placeholder Product',
      price: 300,
      imageUrl: '',
      stock: 0,
      description: 'description placeholder',
    }),
  ]);

  await Promise.all([
    macbook.setCategory(computers),
    macbookPro.setCategory(computers),
    ipad.setCategory(tablets),
    ipadPro.setCategory(tablets),
    iphone.setCategory(phones),
    iphone.setCategory(onSale),
    ipad.setCategory(onSale)
  ]);
  const [l1, l2, l3] = await Promise.all([
    LineItem.create({ productId: ipad.id, orderId: order1.id, quantity: 4 }),
    LineItem.create({ productId: macbook.id, orderId: order2.id, quantity: 3 }),
    LineItem.create({ productId: iphone.id, orderId: order2.id, quantity: 1 }),
  ]);
  const [review1, review2] = await Promise.all([
    Review.create({
      productId: macbookPro.id,
      userId: moe.id,
      rating: 5,
      text: 'review placeholder23213wdsadsdsdsad2e2',
      // verfiedBuyer: true, // not sure this should be hardcoded here... may make sense to set this with a sequelize hook
    }),
    Review.create({
      productId: ipadPro.id,
      userId: harry.id,
      rating: 6,
      text: 'review placeholdersdasdwewqdsadsadsadw3423',
    }),
  ]);
};
module.exports = {
  syncAndSeed,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  User,
};

// module.exports = {
//   syncAndSeed,
//   models: {
//     Category,
//     LineItem,
//     Order,
//     Product,
//     Review,
//     User,
//   },
// };
