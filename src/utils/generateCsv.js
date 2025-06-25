const fs = require("fs/promises");
const path = require("path");

const generateCsv = async (folderPath, fileName, data) => {
  try {
    await fs.mkdir(folderPath, { recursive: true });

    const filePath = path.join(folderPath, fileName);
    const content = data.join(",");

    await fs.writeFile(filePath, content, "utf8");

    console.log(`CSV saved at: ${filePath}`);
  } catch (error) {
    console.error(
      "Job ended!\n.\nError writing CSV file!\nMessage: ",
      error.message
    );
    process.exit(1);
  }
};

module.exports = generateCsv;
