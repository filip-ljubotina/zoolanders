const express = require("express");

const { PORT } = process.env;
const { HOST } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'build')))

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});


app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
}
);
