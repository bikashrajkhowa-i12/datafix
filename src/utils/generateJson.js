const fs = require("fs/promises");
const path = require("path");

const generateJson = async (folderPath, fileName, data) => {
  try {
    await fs.mkdir(folderPath, { recursive: true });

    const filePath = path.join(folderPath, fileName);
    const jsonData = JSON.stringify(data, null, 2);

    // Write JSON data to file
    await fs.writeFile(filePath, jsonData, "utf8");

    console.log(`JSON file saved at: ${filePath}`);
  } catch (error) {
    console.error(
      "Job ended!\n.\nError writing JSON file!\nMessage: ",
      error.message
    );
    process.exit(1);
  }
};

module.exports = generateJson;
