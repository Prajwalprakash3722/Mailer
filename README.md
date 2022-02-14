## Mailer

## This is a Tool that can be used for mass mailing

## Usage

- Clone this repo

- Upload any csv file you have to the data folder, (Usually upload the google form response)

```csv
Timestamp,Email Address,Name,Mobile number,Year of study,Branch,......
2/10/2022 16:33:37,random@gmail.com,Random,83103 39733 ,3,...
```

- Populate the ENV file with your mail credentials and mention the file name you are using to read name and email. or use in the command line <br/>
  ex:

  - In ENV file

  ```
  EMAIL=<email>
  PASS=<password>
  FILE=<file_name>

  ```

  - In command line

  ```
  EMAIL=<email> PASS="<pwd>" FILE=<file_name> node dataMail.js
  ```

### VVIMP If your Headers are different in CSV Files make sure you apply the changes in `dataMail.js` line no 27.<br/>

- If your smtp server has a limit of how many mails it can send at a time you can change the variable here at line no 21 in `dataMail.js`.(Most of the time you can leave it as it is)<br/>
  ex:

  ```js
  const howManyAtATime = 5;
  ```

- If you want to increase the delay time between each mail you can change the variable here at line no 15 in `dataMail.js`.<br/>
  ex:

  ```js
  function delay(del = 1800, variation = 0)
  ```

- A Very Basic Template is provided in `Template.js` file.
  It takes 2 parameters as of now `name` and `title`,
  I am planning to add more parameters in the future.

  - can also manually edit the content

- If you want to add any attachment's to the Mail
  Just put the files in `Attachments` folder.
  It will be automatically picked-up and attached to the mail.

  ### VVIMP Always delete all files in `Attachments` folder after sending a mail.If left it'll also add attachments to the next mail.

- Run the script.
  - Entry Point:
    ` node dataMail.js`
  - The console gives you the progress of the script.
  ````
  CSV file successfully processed
  Approximate Time:  0:04 s, PS: It might take more time if there are any attachments
  Processing> false random@gmail.com 1/1
  Time taken: 0:03 s
  yayy I took less time, You owe me!!```
  ````

## Important Section

- ### VVIMP Always delete all files in `Attachments` folder after sending a mail.If left it'll also add attachments to the next mail.

- ### VVIMP If your Headers are different in CSV Files make sure you apply the changes in `dataMail.js` line no 27.
