const collegeModel= require ("../model/CollegeModel")
const internModel= require  ("../model/InternModel")



let collegeData = async (req, res) => {
    try {
      let data = req.body;
      if (Object.keys(data).length == 0)
        return res
          .status(404)
          .send({ status: false, msg: "plz enter college data" });
      if (!data.name)
        return res.status(404).send({ status: false, msg: "name missing" });
      if (!data.name.match(/^[a-z]+$/i))
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter a valid college Name" });
      if (!data.fullName)
        return res.status(404).send({ status: false, msg: "Full name missing" });
     
          if (!data.logoLink)
          return res.status(404).send({ status: false, msg: "logoLink is required" });

      let result = await collegeModel.create(data);
      return res.status(201).send({ result });
    } catch (err) {
      res.status(500).send({ status: false, data: err.message });
    }
  };
   module.exports.collegeData=collegeData