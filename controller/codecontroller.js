const collegeModel= require ("../model/CollegeModel")
const internModel= require  ("../model/InternModel")


//========================================================= API FOR COLLEGE ====================================================================
let collegeData = async (req, res) => {
    try {
      let data = req.body;
      if (Object.keys(data).length == 0)
        return res
          .status(404)
          .send({ status: false, msg: "plz enter college data" });
      if (!data.name)
        return res.status(404).send({ status: false, msg: "College abbreviation name missing" });
      if (!data.name.match(/^[a-z]+$/i))
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter a valid college Name" });
      if (!data.fullName)
        return res.status(404).send({ status: false, msg: "Full name missing" });
        if (!data.fullName.match(/[a-zA-Z\s]\,[a-zA-Z\s]/))
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter a valid Full Name" });
          if (!data.logoLink)
          return res.status(404).send({ status: false, msg: "logoLink is required" });

      let result = await collegeModel.create(data);
      return res.status(201).send({ result });
    } catch (err) {
      res.status(500).send({ status: false, data: err.message });
    }
  };
//========================================================== API for Intern ======================================================================
  let internData = async (req, res) => {
    try {
      let data = req.body;
      if (Object.keys(data).length == 0)
        return res
          .status(404)
          .send({ status: false, msg: "plz enter Intern data" });
      if (!data.name)
        return res.status(404).send({ status: false, msg: "Name missing" });
        if (!data.name.match(/^[a-z]+\s[a-z ]+$/i))
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter a valid Intern Name" });
      if (!data.email)
        return res.status(404).send({ status: false, msg: "email missing" });
      if (!data.CollegeId)
        return res.status(404).send({ status: false, msg: "CollegeId missing" });
     if(!data.mobile)
     return res.satus(404).send({status: false, msg : "Mobile Number missing"});
      let id = data.CollegeId;
      let validCollege = await collegeModel.findById(id).catch((err) => null);
      if (!validCollege)
        return res.status(404).send({ status: false, msg: "invalid college id" });
        
      let result = await internModel.create(data);
      res.status(201).send({ result });
    } catch (err) {
      return res.status(500).send({ statuS: false, msg: err.message });
    }
  };
   module.exports.collegeData=collegeData
   module.exports.internData=internData