const collegeModel = require("../model/CollegeModel");
const internModel = require("../model/InternModel");

//========================================================= API FOR COLLEGE ====================================================================
let collegeData = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "plz enter college data" });
    if (!data.name)
      return res
        .status(400)
        .send({ status: false, msg: "College abbreviation name missing" });

    if (!data.name.match(/^[a-z]+$/))
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter a valid college Name" });
    if (data.name) {
      let validName = await collegeModel.findOne({ name: data.name });
      if (validName)
        return res
          .status(400)
          .send({ status: false, msg: "College name already exists" });
    }
    if (!data.fullName)
      return res.status(400).send({ status: false, msg: "Full name missing" });

    if (!data.fullName.match(/[a-zA-Z]\,[a-zA-Z ]+$/))
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter a valid Full Name" });

    if (data.fullName) {
      let validfullName = await collegeModel.findOne({
        fullName: data.fullName,
      });
      if (validfullName) {
        return res
          .status(400)
          .send({ status: false, msg: "College fullname already exists" });
      }
    }
    if (!data.logoLink)
      return res
        .status(404)
        .send({ status: false, msg: "logoLink is required" });

    let result = await collegeModel.create(data);
    return res.status(201).send({ result });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
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
    if (data.email) {
      let validEmail = await internModel.findOne({ email: data.email });
      if (validEmail) {
        return res
          .status(400)
          .send({ status: false, msg: "emailId already exists" });
      }
    }
    if (!data.mobile)
      return res
        .status(404)
        .send({ status: false, msg: "Mobile Number missing" });
    if (data.mobile) {
      let validMobile = await internModel.findOne({ mobile: data.mobile });
      if (validMobile) {
        return res
          .status(400)
          .send({ status: false, msg: "Mobile Number already exists" });
      }
    }

    if (!data.collegeId)
      return res.status(404).send({ status: false, msg: "CollegeId missing" });
      if (!/^[0-9a-fA-F]{24}$/.test(data.collegeId)){
        return  res.status(400).send({status:false, message:"Please enter valid 24 characters in collegeId "})
       
    }

    let id = data.collegeId;
    let validCollege = await collegeModel.findById(id).catch((err) => null);
    if (!validCollege)
      return res.status(404).send({ status: false, msg: "invalid college id" });

    let result = await internModel.create(data);
    res.status(201).send({ result });
  } catch (err) {
    return res.status(500).send({ statuS: false, msg: err.message });
  }
};
//=========================================================== GET Api For Colleges=========================================================
let getCollegeDetails = async (req, res) => {
  try {
    let data = req.query.collegeName;

    if (!data)
      return res
        .status(400)
        .send({ status: false, msg: "enter college name or Query missing" });

    if (!data.match(/^[a-z]+$/i))
      return res.status(400).send({
        status: false,
        msg: "Please Enter a valid college Name in query",
      });
    let search = await collegeModel.findOne({ name: data });
    if (!search)
      return res.status(400).send({ status: false, msg: "No College Found" });
    let id = search._id.toString();
    let intern = await internModel.find({ collegeId: id });
    let op = {
      name: search.name,
      fullName: search.fullName,
      logoLink: search.logoLink,
      interests: intern,
    };

    res.status(200).send({ status: true, msg: op });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};
module.exports.collegeData = collegeData;
module.exports.internData = internData;
module.exports.getCollegeDetails = getCollegeDetails;
