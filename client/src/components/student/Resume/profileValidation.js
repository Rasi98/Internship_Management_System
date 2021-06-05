import validator from "validator";

export default function profileValidation(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = "Firstname required";
  }
  if (!values.lastname.trim()) {
    errors.lastname = "Lastname required";
  }
  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.phone) {
    errors.phone = "Phone number required";
  } else if (values.phone.length !== 10) {
    errors.phone = "Should include 10 digits";
  }
  if (!validURL(values.github)) {
    errors.github = "Invalid link";
  }
  if (!validURL(values.linkedin)) {
    errors.linkedin = "Invalid link";
  }
  if (!values.college.trim()) {
    errors.college = "College required";
  }
  if (!values.college.trim()) {
    errors.college = "College required";
  }
  if (!values.fromyear1) {
    errors.fromyear1 = "Year required";
  }
  if (!values.toyear1) {
    errors.toyear1 = "Year required";
  }
  if (!values.qualification1.trim()) {
    errors.qualification1 = "Required";
  }
  if (!values.description1.trim()) {
    errors.description1 = "Required";
  }
  if (!values.school.trim()) {
    errors.school = "Required";
  }
  if (!values.fromyear2) {
    errors.fromyear2 = "Year required";
  }
  if (!values.toyear2) {
    errors.toyear2 = "Year required";
  }
  if (!values.qualification2.trim()) {
    errors.qualification2 = "Required";
  }
  if (!values.description2.trim()) {
    errors.description2 = "Required";
  }
  return errors;
}

//weblink validation
function validURL(URL) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(URL);
}
