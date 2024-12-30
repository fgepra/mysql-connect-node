const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const authRouter = require('./routers/authRouter');

app.use('/api', authRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
