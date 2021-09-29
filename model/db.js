const fs = require("fs/promises");
const path = require("path");

class FileAdapter {
  constructor(file) {
    this.store = path.join(__dirname, file);
  }
  async readFile() {
    return JSON.parse(await fs.readFile(this.store, "utf-8"));
  }
  async writeFile(data) {
    await fs.writeFile(this.store, JSON.stringify(data));
  }
}

module.exports = FileAdapter;
