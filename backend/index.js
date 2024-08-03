import express from "express";
import cors from "cors";


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  return res.json("From BackEnd Side");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
