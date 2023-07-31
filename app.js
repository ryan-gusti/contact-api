require("dotenv").config();
const express = require("express");
const Contact = require("./model/contact");
const app = express();
const port = process.env.PORT;
require("./utils/db");
app.use(express.json());

// home
app.get("/", (req, res) => {
  res.send("ini halaman home");
});

// endpoint create
app.post("/contact", async (req, res) => {
  const { name, phone_number, email } = req.body;
  const result = await Contact.create({
    name,
    phone_number,
    email,
  });
  res.status(201).json({
    data: result,
  });
});

// endpoint delete
app.delete("/contact/:id", async (req, res) => {
  const result = await Contact.findOne({ _id: req.params.id });

  if (!result) {
    res.status(404).json({
      data: "contact not found",
    });
  } else {
    await result.deleteOne();
    res.status(200).json({
      data: result,
    });
  }
});

// endpoint update
app.put("/contact/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone_number, email } = req.body;

  const check = await Contact.findOne({ _id: id });

  if (!check) {
    res.status(404).json({
      data: "contact not found",
    });
  } else {
    const result = await Contact.findOneAndUpdate(
      { _id: id },
      { name, phone_number, email },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      data: result,
    });
  }
});

// endpoint index
app.get("/contact", async (req, res) => {
  const result = await Contact.find();
  res.status(200).json({
    data: result,
  });
});

// endpoint find
app.get("/contact/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result) {
    res.status(404).json({
      data: "contact not found",
    });
  }
  res.status(200).json({
    data: result,
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
