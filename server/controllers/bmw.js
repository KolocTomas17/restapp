const Bmw = require("../models/bmw");

exports.getBmws = async (req, res) => {
  try {
    const result = await Bmw.find().select("name year _id");
    if (result && result.length !== 0) {
      return res.status(200).json({
        count: result.length,
        bmws: result.map((bmw) => {
          return {
            ...bmw.toObject(),
            request: {
              type: "GET",
              url: `http://localhost:3000/bmw/${bmw._id}`,
            },
          };
        }),
      });
    }
    res.status(404).json({ msg: "Bmw not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.getBmw = async (req, res) => {
  try {
    const result = await Bmw.findById(req.params.id).select("-__v");
    if (result) {
      return res.status(200).json({
        ...result.toObject(),
        request: {
          type: "GET",
          url: "http://127.0.0.1:3000/bmw",
        },
      });
    }
    res.status(404).json({ msg: "Bmw not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.postBmw = async (req, res) => {
  try {
    const bmw = new Bmw({
      name: req.body.name,
      year: req.body.year,
      hp: req.body.hp,
      color: req.body.color,
    });
    const result = await bmw.save();
    if (result) {
      return res.status(201).json({
        message: "Your bmw was created",
        createdBmw: {
          ...result.toObject(),
          payload: {
            type: "GET",
            url: `http://127.0.0.1:3000/bmw/${result._id}`,
          },
        },
      });
    }
    res.status(500).json({ msg: "Bmw was not created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.putBmw = async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      year: req.body.year,
      hp: req.body.hp,
      color: req.body.color,
    };
    const result = await Bmw.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Bmw ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/bmw/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Bmw could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.patchBmw = async (req, res) => {
  try {
    const update = {};
    for (const ops of req.body) {
      update[ops.propName] = ops.value;
    }
    const result = await Bmw.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Bmw ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/bmw/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Bmw could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.deleteBmw = async (req, res) => {
  try {
    const result = await Bmw.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Bmw ${result.name}, id: ${result._id} was deleted`,
      });
    }
    res.status(404).json({
      msg: "Bmw not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
