require("dotenv").config();
const app = require("./app.js")


app.listen(3000, () => {
    console.log("Connected !");
})
