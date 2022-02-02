# lectio-wrapper
A node.js wrapper around [lectio.dk](https://www.lectio.dk) written in TypeScript.
 
## Setup

Requires an .env file to run with fields USERNAME, PASSWORD and SCHOOL_ID

The `SCHOOL_ID` is found from the URL when you go on a school's page:

![image](https://user-images.githubusercontent.com/42157469/152179599-81ed2ac0-b0b4-4a2a-b6bf-b85cff0e20dd.png)

The `STUDENT_ID` is found from the URL when you go on your schedule:

[ insert link ]

For example, if your UNI-Login was user1234 and pass1234 and you're enrolled at Bjerringbro Gymnasium, and had a student id of `01234567890` it would look like this:

```
USERNAME=user1234
STUDENT_ID=01234567890
PASSWORD=pass1234
SCHOOL_ID=266
```
