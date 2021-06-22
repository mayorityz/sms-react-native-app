const ControllerModel = require("./../Models/User.Model");

exports.newUser = (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const saveUser = new ControllerModel({ username, email, phone, password });
    saveUser.save((err, record) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          let missingField = Object.keys(err.keyValue);
          return res.status(201).json({
            success: false,
            message: `${missingField[0]} already exists!!!`,
          });
        } else if (err.errors) {
          let errors = Object.keys(err.errors);
          let message = "";

          for (let i = 0; i < errors.length; i++) {
            message += `${errors[i]}, `;
          }
          return res
            .status(201)
            .json({ success: false, message: "Required Field(s): " + message });
        }
        return res.status(201).json(err);
      } else {
        res
          .status(201)
          .json({ success: true, message: "account created successfully!" });
      }
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.message });
  }
};

exports.login = (req, res) => {
  const { phone, password } = req.body;

  try {
    ControllerModel.findOne({ phone, password }, (err, data) => {
      console.log(data);
      console.log(err);
      if (err) {
        return res
          .status(201)
          .json({ success: false, message: "Invalid Credentials" });
      } else {
        if (data === null) {
          return res
            .status(201)
            .json({ success: false, message: "Invalid Credentials" });
        } else {
          return res
            .status(201)
            .json({ success: true, message: "login successful." });
        }
      }
    });
  } catch (error) {
    return res.status(201).json({ success: false, message: error.message });
  }
};
