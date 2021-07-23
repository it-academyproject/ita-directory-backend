/* eslint-disable no-useless-catch */
const fs = require("fs");

const emailGenerator = async (link) => {
  // directory path
  const path = "./app/components/";
  let emailElements = {};

  try {
    // read all components to build Email and build an Object
    fs.readdir(path, (err, files) => {
      if (err) {
        throw err;
      }
      // insert filenmae as key, and the file as valu
      files.forEach((file) => {
        const buffer = fs.readFileSync(path + file);
        const fileContent = buffer.toString();
        //console.log(fileContent);
        let key = file.split(".");
        emailElements[key[0]] = fileContent;
      });
    });
    
    // read Email template and replace values through components
    const emailGenerated = fs.readFileSync("./app/template/email_template.html", "utf8", (err, data) => {
      let email = data;
      for (const key in emailElements) {
        email = email.replace('{' + key + '}', emailElements[key]);
      }
    });
    // emailGenerated = "Esto es un Test";
    
    return emailGenerated;

  } catch (error) {
    throw error;
  }
};


module.exports = emailGenerator;

