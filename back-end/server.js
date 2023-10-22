const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const products = require('./schemas/products');
const users = require('./schemas/users');
const jwt = require('jsonwebtoken');


server.use(express.json()); // get the body in the request
server.use(cors({ origin: '*' })); // Policy -> Secure Policy which specifies our client, so others can't send requests ( DDOS )

mongoose.connect('mongodb://localhost:27017/heavenStylez',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const handleAdminReq = async (req, res, next) => {
  let decoded = null;
  if (req.body.key)
    decoded = await jwt.verify(req.body.key, 'fdsafewt34aqrt43rtq23dsad');
  if (!decoded || decoded.key.role == 'user') {
    res.json({ message: 'Unauthorised request' })
    return;
  }

  res.json({ message: 'Authorised request' })
  next();
}

server.post('/products', async (req, res) => {
  const product = new products({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
  });
  await product.save();

  res.json({ message: 'success' })
})

server.get('/products', async (req, res) => {
  let doc2 = [];
  const doc = await products.find({});

  for (let i = 0; i < doc.length; i++) {
    doc2.push({
      title: doc[i].title,
      description: doc[i].description,
      image: doc[i].image,
      price: doc[i].price
    })

  }
  console.log(doc2);
  res.json({ products: doc2 })
})

server.post('/users', async (req, res) => {
  const user = new users({
    username: req.body.user,
    password: req.body.pass,
    role: req.body.role
  });
  let key = { username: req.body.user, role: req.body.role }
  const token = await jwt.sign({ key }, 'fdsafewt34aqrt43rtq23dsad', { algorithm: 'HS256' }, { expiresIn: '24h' });
  await user.save();
  console.log(token);
  res.json({ token })
})

server.post('/role', handleAdminReq, async (req, res) => {
  let tokenData = { role: decoded.key.role, username: decoded.key.username }
  res.json(tokenData)
})

server.post('/login', async (req, res) => {

  const user = await users.findOne({ username: req.body.username });
  if (user) {
    const result = req.body.password === user.password;
    if (result) {
      let key = { username: req.body.user, role: req.body.role }
      const token = await jwt.sign({ key }, 'fdsafewt34aqrt43rtq23dsad', { algorithm: 'HS256' }, { expiresIn: '24h' });
      res.status(200).json({
        status: 'success',
        token: {
          token
        }
      });
    } else res.status(404).send('Status: Not Found')
  }
  console.log(res.status)
})

server.listen(8000, () => {
  console.log("Server is  on");
})
