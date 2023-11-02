const creators = [
  {
    id: "1",
    name: "Keepitreal",
    totalSale: {
      value: "99.99",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-1.png",
    volume: "500000",
    nftSold: 100,
    followers: 5000,
    bio: "A digital artist exploring new frontiers.",
    chainId: "0xc0E3F1A7B79C",
  },
  {
    id: "2",
    name: "DigiLab",
    totalSale: {
      value: "75.25",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-2.png",
    volume: "75000",
    nftSold: 25,
    followers: 2000,
    bio: "Creating digital wonders.",
    chainId: "0xc34B9E28D7A1",
  },
  {
    id: "3",
    name: "GravityOne",
    totalSale: {
      value: "123.45",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-3.png",
    volume: "150000",
    nftSold: 50,
    followers: 3000,
    bio: "Pushing the boundaries of digital art.",
    chainId: "0x9DE26A8BC3FD",
  },
  {
    id: "4",
    name: "Juanie",
    totalSale: {
      value: "55.55",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-4.png",
    volume: "85000",
    nftSold: 40,
    followers: 2500,
    bio: "Passionate about digital creativity.",
    chainId: "0xA7F5E39D842B",
  },
  {
    id: "5",
    name: "BlueWhale",
    totalSale: {
      value: "67.89",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-5.png",
    volume: "90000",
    nftSold: 35,
    followers: 2300,
    bio: "Exploring the beauty of the digital world.",
    chainId: "0x631D47F8A926",
  },
  {
    id: "6",
    name: "Mr Fox",
    totalSale: {
      value: "123.67",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-6.png",
    volume: "120000",
    nftSold: 60,
    followers: 5500,
    bio: "Digital artist and dreamer.",
    chainId: "0x8B297ECA3F16",
  },
  {
    id: "7",
    name: "Shroomie",
    totalSale: {
      value: "78.33",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-7.png",
    volume: "80000",
    nftSold: 45,
    followers: 2800,
    bio: "Creating magical digital experiences.",
    chainId: "0xC293B816E0FA",
  },
  {
    id: "8",
    name: "Robotica",
    totalSale: {
      value: "88.99",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-8.png",
    volume: "95000",
    nftSold: 55,
    followers: 3800,
    bio: "Futuristic digital art enthusiast.",
    chainId: "0xA9CBB4E72C58",
  },
  {
    id: "9",
    name: "RustyRobot",
    totalSale: {
      value: "45.12",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-9.png",
    volume: "70000",
    nftSold: 30,
    followers: 1800,
    bio: "Mechanical creativity at its best.",
    chainId: "0xD23FAE6A0971",
  },
  {
    id: "10",
    name: "Animakid",
    profileImgPath: "images/avatars/avatar-10.png",
    totalSale: {
      value: "23.58",
      currency: "ETH",
    },
    volume: "20123",
    nftSold: 12,
    followers: 120,
    bio: "Exploring the world of animated art and storytelling through digital media.",
    chainId: "0xF7B9CE810A3D",
  },
  {
    id: "11",
    name: "Dotgu",
    totalSale: {
      value: "33.44",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-11.png",
    volume: "60000",
    nftSold: 70,
    followers: 4200,
    bio: "Connecting dots through digital art, creating beautiful patterns and designs that resonate with the soul.",
    chainId: "0x4DECB77F2F93",
  },
  {
    id: "12",
    name: "Ghiblier",
    totalSale: {
      value: "47.79",
      currency: "ETH",
    },
    profileImgPath: "images/avatars/avatar-12.png",
    volume: "72000",
    nftSold: 80,
    followers: 5500,
    bio: "Bringing fantasy to life with art, crafting enchanting worlds and characters through digital creativity.",
    chainId: "0x1E57AC0FD9E4",
  },
];

const nfts = [
  {
    id: 1,
    creatorId: 5,
    price: {
      value: "1.63",
      currency: "ETH",
    },
    highestBid: {
      value: "0.33",
      currency: "wETH",
    },
    name: "Distant Galaxy",
    imgPath: "images/nfts/1.png",
  },
  {
    id: 2,
    creatorId: 3,
    price: {
      value: "2.42",
      currency: "ETH",
    },
    highestBid: {
      value: "0.75",
      currency: "wETH",
    },
    name: "Life On Edena",
    imgPath: "images/nfts/2.png",
  },
  {
    id: 3,
    creatorId: 10,
    price: {
      value: "3.17",
      currency: "ETH",
    },
    highestBid: {
      value: "0.95",
      currency: "wETH",
    },
    name: "AstroFiction",
    imgPath: "images/nfts/3.png",
  },
  {
    id: 4,
    creatorId: 7,
    price: {
      value: "0.99",
      currency: "ETH",
    },
    highestBid: {
      value: "0.21",
      currency: "wETH",
    },
    name: "CryptoCity",
    imgPath: "images/nfts/4.png",
  },
  {
    id: 5,
    creatorId: 11,
    price: {
      value: "4.75",
      currency: "ETH",
    },
    highestBid: {
      value: "0.65",
      currency: "wETH",
    },
    name: "ColorfulDog 0524",
    imgPath: "images/nfts/5.png",
  },
  {
    id: 6,
    creatorId: 2,
    price: {
      value: "1.33",
      currency: "ETH",
    },
    highestBid: {
      value: "0.15",
      currency: "wETH",
    },
    name: "Space Tales",
    imgPath: "images/nfts/6.png",
  },
  {
    id: 7,
    creatorId: 4,
    price: {
      value: "5.27",
      currency: "ETH",
    },
    highestBid: {
      value: "0.97",
      currency: "wETH",
    },
    name: "Cherry Blossom Girl 037",
    imgPath: "images/nfts/7.png",
  },
  {
    id: 8,
    creatorId: 6,
    price: {
      value: "2.93",
      currency: "ETH",
    },
    highestBid: {
      value: "0.51",
      currency: "wETH",
    },
    name: "Dancing Robots 0987",
    imgPath: "images/nfts/8.png",
  },
  {
    id: 9,
    creatorId: 8,
    price: {
      value: "1.12",
      currency: "ETH",
    },
    highestBid: {
      value: "0.31",
      currency: "wETH",
    },
    name: "IceCream Ape ",
    imgPath: "images/nfts/9.png",
  },
  {
    id: 10,
    creatorId: 9,
    price: {
      value: "3.99",
      currency: "ETH",
    },
    highestBid: {
      value: "0.85",
      currency: "wETH",
    },
    name: "Foxy Life",
    imgPath: "images/nfts/10.png",
  },
  {
    id: 11,
    creatorId: 10,
    price: {
      value: "4.88",
      currency: "ETH",
    },
    highestBid: {
      value: "1.23",
      currency: "wETH",
    },
    name: "Cat from future",
    imgPath: "images/nfts/11.png",
  },
  {
    id: 12,
    creatorId: 12,
    price: {
      value: "2.49",
      currency: "ETH",
    },
    highestBid: {
      value: "0.62",
      currency: "wETH",
    },
    name: "Psycho Dog",
    imgPath: "images/nfts/12.png",
  },
  {
    id: 13,
    creatorId: 3,
    price: {
      value: "2.17",
      currency: "ETH",
    },
    highestBid: {
      value: "0.74",
      currency: "wETH",
    },
    name: "Designer Bear",
    imgPath: "images/nfts/13.png",
  },
  {
    id: 14,
    creatorId: 5,
    price: {
      value: "5.33",
      currency: "ETH",
    },
    highestBid: {
      value: "1.02",
      currency: "wETH",
    },
    name: "Dancing Robot 0375",
    imgPath: "images/nfts/14.png",
  },
  {
    id: 15,
    creatorId: 10,
    price: {
      value: "3.68",
      currency: "ETH",
    },
    highestBid: {
      value: "0.92",
      currency: "wETH",
    },
    name: "Dancing Robot 0356",
    imgPath: "images/nfts/15.png",
  },
  {
    id: 16,
    creatorId: 10,
    price: {
      value: "4.45",
      currency: "ETH",
    },
    highestBid: {
      value: "1.14",
      currency: "wETH",
    },
    name: "Dancing Robot 0321",
    imgPath: "images/nfts/16.png",
  },
  {
    id: 17,
    creatorId: 2,
    price: {
      value: "1.88",
      currency: "ETH",
    },
    highestBid: {
      value: "0.44",
      currency: "wETH",
    },
    name: "Dancing Robot 0512",
    imgPath: "images/nfts/17.png",
  },
  {
    id: 18,
    creatorId: 10,
    price: {
      value: "1.88",
      currency: "ETH",
    },
    highestBid: {
      value: "0.44",
      currency: "wETH",
    },
    name: "Dancing Robot 0024",
    imgPath: "images/nfts/18.png",
  },
];

const users = [
  {
    id: "05447d92-320c-4b11-bcf7-563044a872d2",
    username: "code",
    email: "info@code.edu.az",
    password: "123Code!",
  },
  {
    id: "c1e5b887-4c20-4f32-a9c0-9be860bb4705",
    username: "dada",
    email: "dada@code.edu.az",
    password: "123Dada!",
  },
  {
    id: "1a01b287-f8d1-4a91-91bb-3fff8fca0e61",
    username: "studentOffice",
    email: "so@code.edu.az",
    password: "123Test!",
  },
  {
    id: "2ab91e44-e5db-42ba-b15d-29aa09476831",
    username: "academic",
    email: "academic@code.edu.az",
    password: "123Academic!",
  },
];

module.exports = {
  creators,
  nfts,
  users,
};
