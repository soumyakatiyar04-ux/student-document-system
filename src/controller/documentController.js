const connection = require("../config/db");
const { uploadDocument } = require("../services/s3Service");

const { uploadM } = require("@aws-sdk/client-cloudwatch");

const getDocuments = async (req, res) => {
  let query = "SELECT * FROM documents";
  const [result] = await connection.query(query);
  res.json({
    message: "Data fetched successfully",
    data: result,
  });
};

const getElementById = async (req, res) => {
  let query = "SELECT * FROM documents WHERE id = ?";
  const [result] = await connection.query(query, [req.params.id]);
  res.json({
    message: "Data fetched successfully",
    data: result,
  });
};

const getElementByUserId = async (req, res) => {
  let query = "SELECT * FROM documents WHERE user_id = ?";
  const [result] = await connection.query(query, [req.params.user_id]);
  res.json({
    message: "Data fetched successfully",
    data: result,
  });
};

const postDocuments = async (req, res) => {
  let profile = req.file;
  let user_id = req.body.user_id;

  if (!profile || !user_id) {
    return res.json({
      message: "File and user_id are required",
    });
  }

  // Upload file to S3
  let s3Data = await uploadDocument(profile, user_id);

  // Insert data into database
  let query = `
        INSERT INTO documents
        (s3_key, s3_url, file_size, mime_type, original_name, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  const [result] = await connection.execute(query, [
    s3Data.s3_key,
    s3Data.s3_url,
    profile.size,
    profile.mimetype,
    profile.originalname,
    user_id,
  ]);

  console.log("Data inserted successfully");

  res.json({
    message: "Document uploaded successfully",
  });
};
module.exports = {
  getDocuments,
  postDocuments,
  getElementById,
  getElementByUserId,
};
