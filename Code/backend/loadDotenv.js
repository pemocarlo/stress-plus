(function () {
  const fs = require("fs");
  const dotenv = require("dotenv");
  [".env.local", ".env"].forEach((file) => {
    if (fs.existsSync(file)) {
      dotenv.config({path: file});
    }
  });
})();
