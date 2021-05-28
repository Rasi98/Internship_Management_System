import ITA from "../models/ita.js";

export const getita = async (req, res) => {
  try {
    const itaList = await ITA.find();
    console.log(itaList);
    res.status(200).json(itaList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addita = async (req, res) => {
  const itaData = req.body;
  const newita = new ITA(itaData);
  try {
    await newita.save();
    res.status(201).json("Success");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const findita = (req, res) => {
  ITA.findById(req.params.id)
    .then((ita) => res.json(ita))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteita = (req, res) => {
  ITA.findByIdAndDelete(req.params.id)
    .then(() => res.json("ITA deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateita = (req, res) => {
  ITA.findById(req.params.id)
    .then((ita) => {
      ita.username = req.body.username;
      ita.password = req.body.password;
      ita.name = req.body.name;
      ita.email = req.body.email;
      ita.phone = req.body.phone;
      ita.company = req.body.company;
      ita
        .save()
        .then(() => res.json("ITA updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};