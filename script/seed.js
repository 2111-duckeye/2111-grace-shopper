'use strict';
const {
  db,
  models: { User, Product, Order, Cart_Item },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
  {
    username: 'KittyCorner',
    password: 'iLovecats123',
    email: 'catsrlyfe@hotmail.com',
    isAdmin: false,
  },
  {
    username: 'catdreamer808',
    password: 'pawprintz080',
    email: 'purrpurr@gmail.com',
    isAdmin: false,
  },
  {
    username: 'CarlyM',
    password: '@SecurePassword45',
    email: 'cmcpherson@gmail.com',
    isAdmin: true,
  },
  {
    username: 'meowmix',
    password: 'verilyafelinefriend33',
    email: 'vff33@gmail.com',
    isAdmin: false,
  },
];
// username, password, email, isAdmin
const products = [
  {
    name: 'Multievel Cat Climbing Tower in Brown',
    imageURL:
      'https://images.urbndata.com/is/image/UrbanOutfitters/62198411_020_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=1314',
    description:
      'Great climbing tower for cats, aesthetically pleasing design to win over the hearts of your cats and your guests',
    price: 399.0,
  },
  {
    name: 'Neco Hasami Cat Plate Set',
    imageURL:
      'https://cdn.shopify.com/s/files/1/0553/0461/8173/products/neco-hasami-cat-plate-set-musubi-kiln-handmade-japanese-tableware-and-japanese-dinnerware-538065_1000x.jpg?v=1633599695',
    description:
      'A set of five plates of lovely cats drawn with a delicate touch. It has unique shape with slightly pointed up ears of a cat. It can be used for serving side dishes and desserts, and also as an accessory tray. Whether for everyday use or for entertaining your guests, it can be used in various settings. It comes in an original wooden box with a small illustration of cat. This set will be a perfect gift for your cat-loving friends or family members. Of course, it can also be a great gift to yourself.',
    price: 52.0,
  },
  {
    name: 'The Refined Feline Lotus Cat Tower',
    imageURL:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYqnf_Li0Df1AwzdXh3dQNxrXJOGyka1TL7-hoewxb70UegBH6FfbBR2S8bcvl3_GoXtmIxVMNt2VdYq6S-QOrWaes286UcCFH6S6Sm9I&usqp=CAE',
    description:
      'A sleek, organic design, the Lotus Cat Tower is a modern take on cat furniture. Its Zen-like design blends symmetry, functionality, and minimalism into a beautiful "flowering" tower. This design accents decors with modern flair or those eclectic homes that have incorporated the minimalist movement.',
    price: 439.99,
  },
  {
    name: 'The Refined Feline Crystal Clear Lotus Cat Tower',
    imageURL:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQMwsvdCQWDWPdGcbkjZQVUei5d2e7oMOAekYjx_0TPXqYRMRLu2PLFND5PB9jr41_LV27G_1isVndzg2gHZXd24BbKe_wbqXyungMONa4&usqp=CAE',
    description: `This premium luxury cat tree is made in the United States by a master craftsman, skilled in bending acrylic. For you, it's a piece of art. For your cat, it's the ultimate tower to climb and perch. Its plush faux fur fabric attaches to the cat tower with Velcro, providing a comfortable place to lounge that can be washed or even replaced if soiled. Only an extremely limited quantity of this beautiful tower has been produced.`,
    price: 5000.0,
  },
  {
    name: 'Penn Plax Catwalk Luxury Lounger Cat Bed',
    imageURL:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQPWrsKlL31xm2Snx09EUiDZXQMXgIkgb18FyqRValRZHx9DKlkOIH-aCMAfd_PYQVPF31LGDWSww9ywAKwDN5WN92Cax5egOedwRvFvVZfc-hlIwkPwzLHFCpt&usqp=CAY',
    description: `Penn Plax Luxury Cat Bed Lounger is a lavish mid century style home dcor piece of cat furniture. Made to compliment your decor, this cat bed has an upholstered, plush cushion that has velcro to ensure the cushion wont move around when your feline jumps on and off. The cushion cover is made with plush and can be removed for washing if needed. This cat bed is elevated giving your cat a nice perch to catch some rest and relaxation on. `,
    price: 88.0,
  },
  {
    name: 'Refined Feline Calypso Cat Scratcher',
    imageURL:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQMkVEhDs4rFniU8RAHe9H7aAuF6a83EXPq0ui9OgSMlh6PHE6KLeWhav0pIuLGfMX7UTnoBtcv6Nu9dHXBbm8l6KTgpW8ws9UqmeHEsKuJR28mrckRk4Oe&usqp=CAY',
    description: `The attractive Sisal Yarn design is wrapped around a sturdy wire frame construction and comes in your choice of available color. The included weighted bottom prevents tipping, and this scratcher is suitable for both small and large cats.`,
    price: 100.0,
  },
  {
    name: 'Swing Pet Hammock for Cats',
    imageURL:
      'https://secure.img1-fg.wfcdn.com/im/89341377/resize-h350%5Ecompr-r85/1433/143309095/Swing+Pet+Hammock+For+Cats+-+Scratch+Resistant+Cozy+Covered+Cat+Bed+For+Indoor+Cats+-+Cushioned+Cat+Cave+Bed.jpg',
    description: `Are you looking for a cozy, comforting, and scratch-resistant hammock bed for your pet? Look no more - SussexHome Pets has the solution! Our covered cat bed offers protection, support, and swinging sensations due to its suspended egg-like build with a soft padded cushion. Fabulous for all surroundings with its naturally attractive jute fibres design.`,
    price: 120.0,
  },
  {
    name: '2-in-1 Cat Exercise Cradle',
    imageURL:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRddzD3Th09LXv_hmk4zvsS5TQfV7zTIVTFdJoSJ_ZMkRYsFTu31JCsXUS2Hz87V_3AHl_C7D9Sz9d1A0Em2IsHhV300Az0FXfs3Oqqe-v0S3YiBU3rSC1o&usqp=CAE',
    description: `Let your cat let loose with this fun product that's sure to tucker them out for some cozy nap times`,
    price: 56.99,
  },
  {
    name: 'Exotic Feather Toy',
    imageURL:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRutsalNqC8bmxHTen88SOXI9sPMLqlp7x-d08L39eR4p328IgtBexEZe6az6zgbr_VkCoXv6zcUkrXzhR8Fn5NBUresTmouVvrEmfAcLsSZvB4ZcfYTg39bQ&usqp=CAE',
    description: `Made with feathers that are only collected when dropped naturally, this toy promises to captivate your cats' attention and look fabulous in your hand`,
    price: 45.0,
  },
  {
    name: 'Teak Whack-A-Mole Cat Toy',
    imageURL:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTYs9CnC228p9Sx8BF4fe89gR4YWDF-5jgBsjUKhpGNU2axpb0ChYrWiVpF3ZMLCD5-aKdGRvwuRDXj0h5EUkuq4Tn4N5YXIDZ7RpZyfnv6L04gkS20l3DRRA&usqp=CAE',
    description: `If you are looking for the best device to help you raise a well-trained, healthy cat with sharp hunting instincts and excellent mental alertness, then you’ll both love playing with this interactive cat toy! Relax and watch them roll about, or join in the fun and get ever closer to your feline friends.`,
    price: 75.0,
  },
  {
    name: 'Automatic Self-Scooping Litterbox',
    imageURL:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQFEAig9X4looPfsDp2t3je6d1EwLxwNItnpG-0Y1pYmv3Hk-9eQYvfkp-yqpA-KmorUCSW7EMoPRof3bqGk3trS80egFIJTVYHZdwPQy9YOBuDSyYEOEMc&usqp=CAE',
    description: `The WiFi-enabled, automatic self-cleaning litter box for cats that solves the problems associated with maintaining a traditional litter box: No more scooping. The patented sifting system removes waste after each use, reduces odor, and ensures a clean bed of litter every time. The Connect app gives you additional freedom from your litter box duties by allowing you to remotely monitor the waste drawer level in the Litter-Robot, while helpful push notifications alert you when it's time to empty the unit.`,
    price: 500.0,
  },
  {
    name: 'Crystal-studded satin cat collar',
    imageURL:
      'https://www.prada.com/content/dam/pradanux_products/2/2YC/2YC011/2AWLF0T7O/2YC011_2AWL_F0T7O_SLF.png/jcr:content/renditions/cq5dam.web.hf7f7f7.1250.1250.jpg',
    description: `This pet accessory has been given an alluring luxe look: the satin collar is embellished with sparkling crystals. the accessory with side-release buckle is completed by the enameled triangle logo.`,
    price: 469.0,
  },
  {
    name: 'Catio Cat Tower Enclosure',
    imageURL:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS2skYpbm4DWnU6FrqjRBaysjSNgnheWknHGtLPNyaHY20scHSzf1IiBLcM9ueOvgNn1wmLIVYhdl0_ETkFMhbuCdlFZFh2&usqp=CAY',
    description: `Cats love to explore, climb, and play. But those activities arent always appropriate inside the home. Yet letting your pet go outside alone is fraught with danger. The answer to entertaining your cat and providing needed exercise is the Catio! What is a Catio? A catio is a customizable play land for your cat or multiple cats. Its like a jungle gym, providing fun and physical activity by climbing, running, jumping and perching up high, to hide, sleep, sunbath or just observe the world in total safety from busy roads, getting lost, or being attacked by other animals. `,
    price: 420.0,
  },
  {
    name: 'Cat Pyramid',
    imageURL:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRl8CJiF0RwYd4iwmGD_4bb_zmL-sz6sd9F33IUKYjeJ-ETAiAJ_2MKEHTlRQmaTJeUqIyF93zEIDpLNp_wRi8cUOIt3JPGwtfpUNb-ifF6ranv_154hqGe&usqp=CAY',
    description: `The modern cat pyramid provides your cat with a playscape and ample space to lounge. This A-frame cat tree features two climbing holes, a sisal scratch pad at the bottom, and soft felt pads to keep cats entertained while blending seamlessly into your home decor.`,
    price: 150.0,
  },
  {
    name: 'Large Adventure Backpack',
    imageURL:
      'https://cdn.shopify.com/s/files/1/0071/2497/5683/products/8D9DB520-99D7-41F4-A294-894008D45D56.jpg?v=1633665735',
    description: `Our backpack allows you to always bring your fur baby with you. Shopping, outdoor activities, Starbucks? No problem! Arthemisclothing backpack is also perfect for public transport & veterinarian appointments.`,
    price: 99.99,
  },
  {
    name: 'Cat Collar Camera',
    imageURL:
      'https://i.etsystatic.com/23535659/r/il/de4b9e/2655793052/il_794xN.2655793052_kdmi.jpg',
    description: `Hear them purr, See them play, Feel them live! Lightweight, compact and collar mounted HD video camera for your pet!
    `,
    price: 69.95,
  },
  {
    name: 'Necoichi Ninja Cat Collar',
    imageURL:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ_nvE8E9lz7LUE7GIClxnxGiyzadi42Aya5uos0Acg5If436z9Vv3_8GkIaWBWrbgKabko5QjgLeJOFpHoNaaTdxTmw1JC&usqp=CAY',
    description: `Beautifully crafted in Japan with traditional Karakusa print to give your cat a look unique enough to last nine lives!`,
    price: 20.0,
  },
  {
    name: 'Cat Sandals',
    imageURL:
      'https://i.etsystatic.com/23343527/r/il/0eb918/3229024286/il_1588xN.3229024286_mq88.jpg',
    description: `High quality mesh material, soft and comfortable, breathable and durable. Look and Hoop design, loose and adjustable, convenient to wear. Rubber non-slip sole for easy and practical use.`,
    price: 17.99,
  },
  {
    name: 'Cat Exercise Wheel',
    imageURL:
      'https://cdn.shopify.com/s/files/1/0061/4652/3170/products/5thgencatexercisewheel-black-dsc03167_4_1024x1024.jpg?v=1597192649',
    description: `Our exercise wheel makes it easy for your feline to get that summer-ready body. In addition to offering an outlet to excess energy, the wheel can help burn off extra calories, too. It may take a bit more time and dedication to get a chubby cat running on a regular basis, but once they do, you'll start to see them slim down into their more svelte selves. A One Fast Cat exercise wheel is an excellent tool for keeping your cat happy and healthy.`,
    price: 249.99,
  },
  {
    name: 'Baguette Cat Toys filled with Catnip ',
    imageURL:
      'https://i.etsystatic.com/13107676/r/il/5126cc/1170696918/il_794xN.1170696918_lx4a.jpg',
    description: `Felt baguette cat toy filled with organic catnip, handmade with love in Canada. This adorable catnip toy will make a purrfect gift for cats and cat lovers`,
    price: 15.0,
  },
];
//name, description, price, imageURL
//{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
const orders = [
  {
    completed: true,
    total: 15,
    userId: 1,
    id: 1,
  },
  {
    completed: true,
    total: 5097,
    userId: 1,
    id: 2,
  },
  {
    completed: false,
    total: 35,
    userId: 2,
    id: 3,
  },
  {
    completed: false,
    userId: 1,
    id: 4,
  },
  {
    completed: false,
    userId: 3,
    id: 5,
  },
  {
    completed: false,
    userId: 4,
    id: 6,
  },
];

const cartItems = [
  {
    orderId: 1,
    productId: 20,
    quantity: 1,
    total: 15,
    price: 15,
  },
  {
    orderId: 2,
    productId: 4,
    quantity: 1,
    total: 5000,
    price: 5000,
  },
  {
    orderId: 2,
    productId: 2,
    quantity: 1,
    total: 52,
    price: 52,
  },
  {
    orderId: 2,
    productId: 9,
    quantity: 1,
    total: 45,
    price: 45,
  },
  {
    orderId: 3,
    productId: 20,
    quantity: 1,
    total: 15,
    price: 15,
  },
  {
    orderId: 3,
    productId: 17,
    quantity: 1,
    total: 20,
    price: 20,
  },
];

const seed = async () => {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db syncing!');

  // Example
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  //CREATING USERS
  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  //CREATING PRODUCTS
  await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );

  //CREATING ORDERS
  await Promise.all(
    orders.map((order) => {
      return Order.create(order);
    })
  );

  //CREATING CART ITEMS
  await Promise.all(
    cartItems.map((item) => {
      return Cart_Item.create(item);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
