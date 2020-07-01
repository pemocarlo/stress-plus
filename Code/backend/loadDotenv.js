(function () {
  const fs = require("fs");
  const dotenv = require("dotenv");
  [".env", ".env.local"].forEach((file) => {
    if (fs.existsSync(file)) {
      dotenv.config({path: file});
    }
  });
})();
