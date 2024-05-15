import express from "express";

const router = express.Router();

router.all("/", (req, res) => {
  res.status(200).json({
    method: req.method,
    body: req.body,
  });
});

export { router as echoRoute };
