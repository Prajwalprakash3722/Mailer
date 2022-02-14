import dotenv from "dotenv";
import Template from "./template.js";
import fs from "fs";
import path from "path";
import transporter from "./lib/Mailer.js";
dotenv.config();

function ReadAttachments() {
  const attachments = [];
  const files = fs.readdirSync(path.join(process.cwd(), "Attachments"));
  if (files.length === 0) return null;
  files.map((file) => {
    attachments.push({
      filename: file,
      path: path.join(process.cwd(), "Attachments", file),
    });
  });
  return attachments;
}

const title = "Deadline for “Build your own portfolio website” Extended";

async function SendMail(data) {
  // send mail with defined transport object
  return transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: data.email, // list of receivers
    subject: title, // Subject line
    text: title, // plain text body
    html: Template(data.name, title), // html body
    attachments: ReadAttachments(),
  });
}

export default SendMail;
