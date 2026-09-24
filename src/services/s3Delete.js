const express = require("express");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
// const uploadNotification = require("./snsServices");
const connection = require("../config/db");

const s3 = require("../config/s3config");

const deleteBucket = express.Router();

deleteBucket.delete("/documents/:user_id", async (req, res) => {

    let user_id = req.params.user_id;
  const [result] = await connection.query(
    "SELECT s3_key FROM documents WHERE user_id = ?",[user_id]);

   let s3_key = result[0].s3_key;

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3_key,
    }),
  );
    console.log("File deleted from S3");

      let deleteQuery = "DELETE FROM documents WHERE user_id = ?";

    const [deleteResult] = await connection.query(
        deleteQuery,[user_id]);
    res.status(200).json({
        message: "Document deleted successfully",
        deletedRows: deleteResult.affectedRows
    });
    // console.log(result);
  });

module.exports = deleteBucket;