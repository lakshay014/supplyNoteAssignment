const dotenv = require("dotenv");
const express = require("express");
const ShortUrl = require("./model/shortUrl")
const authenticate = require("./middleware/authenticate")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");
dotenv.config({ path: "./config.env" });
require("./db/conn");
const shortId = require('shortid')
const User = require("./model/userSchema");
const app = express();
app.use(bodyParser.json())
app.use(cookieParser())
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are mandatory" });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log("yes")
      token = await userExist.generateAuthToken();
      console.log(token);
      // res.cookie("jwtoken", token, {
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly: true
      // })
      console.log(userExist.password === password)
      isMatch = userExist.password === password;
      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.status(201).json(
          {
            message: "login successful",
            token: token
          });
        console.log("login");
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/', async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "All fields are mandatory" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(401).json({ error: "password doesn't match" });
    } else {
      const user = new User({
        name,
        email,
        password,
        cpassword,
      });

      await user.save();
      res.status(201).json({ message: "user registered successfully" });

    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/userProfile', authenticate, (req, res) => {
  console.log("User Profile Hit");
  res.send(req.rootUser)
})

app.get('/urls', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.status(200).send({ shortUrls: shortUrls });
})

app.get('/logout', (req, res) => {
  res.clearCookie("jwtoken", { path: '/' });
  res.status(200).send("user logged out")
})

app.post('/shortUrls', async (req, res) => {
  const full = req.body.full;
  if (!full) {
    return res.status(422).json({ error: "Enter the url" });
  }
  try {
    const urlExist = await ShortUrl.findOne({ full: full });
    if (urlExist)
      res.status(201).send({ full: urlExist.full, short: urlExist.short, clicks: urlExist.clicks })
    else {
      const short = shortId.generate();
      const clicks = 0;
      const url = new ShortUrl({
        full,
        short,
        clicks
      });

      await url.save();
      console.log("url added");
      res.send(url);

    }
  } catch (err) {
    console.log(err);
  }
})

app.put('/update', async (req, res) => {
  console.log(req.body.short)
  const shortUrl = await ShortUrl.findOne({ short: req.body.short })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.clicks++;
  await shortUrl.save();
  res.status(202).send({ message: "updated" })
})

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server is running...."));