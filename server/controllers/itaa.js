import ITAA from "../models/itaa.js";

export const getitaa = async (req, res) => {
  try {
    const itaaList = await ITAA.find();
    console.log(itaaList);
    res.status(200).json(itaaList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const additaa = async (req, res) => {
  const itaaData = req.body;
  const newitaa = new ITAA(itaaData);
  try {
    await newitaa.save();
    res.status(201).json("Success");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const finditaa = (req, res) => {
  ITAA.findById(req.params.id)
    .then((itaa) => res.json(itaa))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteitaa = (req, res) => {
  ITAA.findByIdAndDelete(req.params.id)
    .then(() => res.json("ITAA deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateitaa = (req, res) => {
  ITAA.findById(req.params.id)
    .then((itaa) => {
      itaa.username = req.body.username;
      itaa.password = req.body.password;
      itaa.name = req.body.name;
      itaa.email = req.body.email;
      itaa.phone = req.body.phone;
      itaa
        .save()
        .then(() => res.json("ITAA updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};
