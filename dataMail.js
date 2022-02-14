import csv from "csv-parser";
import fs from "fs";
import sendEmail from "./mail.js";
import chalk from "chalk";
const results = [];

/*Conversion of strange digits into Human readable time*/
function HumanReadableTime(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

/*Promise that resolves in del */
function delay(del = 1800, variation = 0) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), del + Math.random() * variation - variation / 2);
  });
}

const howManyAtATime = 5;

const EmailData = {
  title: "Deadline for “Build your own portfolio website” Extended",
  content: `Hello world\nHow are you boi\n\nMai Boi`,
  button_link: "www.google.com",
  button_text: "Google",
  footer_text: "Automated mail",
};

var start = new Date();
fs.createReadStream(`data/${process.env.FILE || "dummy.csv"}`)
  .pipe(csv())
  .on("data", (data) => {
    const Edata = {
      name: data["Name"],
      email: data["Email Address"],
    };
    results.push(Edata);
  })
  .on("end", async () => {
    console.log("CSV file successfully processed");
    const app = results.length * 4200;
    console.log(
      chalk.cyan(
        "Approximate Time: ",
        HumanReadableTime(app),
        "s, PS: It might take more time if there are any attachments"
      )
    );
    let i = 0;
    for (let data of results) {
      if (i === howManyAtATime) i = 0;
      console.log(
        chalk.magenta(
          "Processing>",
          i === howManyAtATime - 1,
          data.email,
          `${i + 1}/${results.length}`
        )
      );
      const res = await Promise.all([
        sendEmail(data, EmailData),
        delay(5000 * +(i === howManyAtATime - 1)),
      ]);
      i++;
      var end = new Date();
    }
    const tot = end - start;
    console.log("Time taken:", HumanReadableTime(tot), "s");
    app <= tot
      ? console.log(chalk.red("I'm sorry I took more time"))
      : console.log(chalk.green("yayy I took less time, You owe me!!"));
  });
