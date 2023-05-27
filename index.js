const express = require("express")
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()
const cors = require("cors")
require('dotenv').config();

app.use(express.json())
app.use(cors())

app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

app.use("/abonne", require("./routes/abonneRoute"))
app.use("/userbox", require("./routes/userboxRoute"))
app.use("/activite", require("./routes/activiteRoute"))
app.use("/review", require("./routes/reviewRoute"))
app.use("/listenlist", require("./routes/listenlistRoute"))


//register and login routes
app.use("/auth", require("./routes/jwtAuth"))

app.listen(5000, () => console.log('App running on port 5000'));