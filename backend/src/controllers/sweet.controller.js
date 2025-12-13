let sweets = [];
let idCounter = 1;

exports.createSweet = (req, res) => {
  const { name, price } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Sweet name is required" });
  }

  if (price === undefined) {
    return res.status(400).json({ error: "Sweet price is required" });
  }

  const sweet = {
    id: idCounter++,
    name,
    price,
  };

  sweets.push(sweet);

  return res.status(201).json(sweet);
};


exports.getAllSweets = (req, res) => {
  return res.status(200).json(sweets);
};

exports.deleteSweet = (req, res) => {
  const { id } = req.params;

  sweets = sweets.filter((sweet) => sweet.id !== Number(id));

  return res.status(200).json({
    message: "Sweet deleted",
  });
};
