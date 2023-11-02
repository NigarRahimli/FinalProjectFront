const data = require("./fake-data");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const { creators, nfts, users } = data;
const app = express();
const port = 3000;

const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const validateWithRegex = (text, pattern) => {
  return pattern.test(text);
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome our api!");
});

app.get("/api/creators", (req, res) => {
  res.status(200).json(creators);
});

app.get("/api/creators/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Creator id is required!" });
    }

    const creator = creators.find((creat0r) => creat0r.id == id);
    if (!creator) {
      return res
        .status(404)
        .json({ error: `Creator not found with id: ${id}` });
    }
    creator.nfts = nfts.filter((nft) => nft.creatorId == id);
    res.status(200).json(creator);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.delete("/api/creators/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Creator id is required!" });
    }

    const creatorIdx = creators.findIndex((creator) => creator.id == id);
    if (creatorIdx === -1) {
      return res
        .status(404)
        .json({ error: `Creator not found with id: ${id}` });
    }
    const deletedCreator = creators.splice(creatorIdx, 1)[0];
    res.status(200).json(deletedCreator);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.post("/api/nfts", (req, res) => {
  try {
    const { skip, pageSize, searchStr } = req.body;
    if (!pageSize) {
      return res.status(400).json({ error: "Field 'pageSize' is required!" });
    }
    const startIndex = skip ? skip : 0;
    const endIndex = startIndex + pageSize;

    const filteredNFTS = nfts.filter((nft) =>
      searchStr
        ? nft.name.toLowerCase().includes(searchStr.toLowerCase())
        : true
    );
    const nftsSlice = filteredNFTS.slice(startIndex, endIndex).map((nft) => ({
      ...nft,
      creator: creators.find((c) => c.id == nft.creatorId),
      creatorId: undefined,
    }));

    res.status(200).json({
      hasMore: endIndex < filteredNFTS.length,
      nfts: nftsSlice,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.post("/api/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json({ error: "Fields 'username' and 'password' are required!" });
    }

    const user = users.find(
      (user) => user.password === password && user.username === username
    );

    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found! Wrong email or password." });
    }

    res.status(200).json({ ...user, password: undefined });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.post("/api/register", (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Fields 'username', 'email' and 'password' are required!",
      });
    }
    if (!validateWithRegex(email, EMAIL_REGEX)) {
      return res.status(400).json({
        error: "Email is not valid!",
      });
    }
    if (!validateWithRegex(password, PASSWORD_REGEX)) {
      return res.status(400).json({
        error: "Password is not valid!",
      });
    }

    const isUsernameAlreadyUsed = users.some(
      (user) =>
        user.username.toLowerCase().trim() === username.toLowerCase().trim()
    );

    if (isUsernameAlreadyUsed) {
      return res.status(400).json({
        error: "Username is already used!",
      });
    }
    const isEmailAlreadyUsed = users.some(
      (user) => user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (isEmailAlreadyUsed) {
      return res.status(400).json({
        error: "Email is already used!",
      });
    }

    const newUser = {
      id: uuidv4(),
      email,
      username,
      password,
    };

    users.push(newUser);

    res.status(200).json({ ...newUser, password: undefined });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.listen(port, () => {
  console.log(`NFT Marketplace server app listening on port ${port}`);
});
