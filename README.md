# lectio-wrapper
A node.js wrapper around [lectio.dk](https://www.lectio.dk) written in TypeScript.
 
## Setup

Requires an .env file to run with fields USERNAME, PASSWORD and SCHOOL_ID

The `SCHOOL_ID` is found from the URL when you go on a school's page:

![image](https://user-images.githubusercontent.com/42157469/152179599-81ed2ac0-b0b4-4a2a-b6bf-b85cff0e20dd.png)

The `STUDENT_ID` is found from the URL when you go on your schedule:

![image](https://user-images.githubusercontent.com/42157469/152216835-369420cc-fbcf-4775-81f7-5daffd4b2619.png)

For example, if your UNI-Login was user1234 and pass1234 and you're enrolled at Bjerringbro Gymnasium, and had a student id of `01234567890` it would look like this:

```
USERNAME=user1234
PASSWORD=pass1234
STUDENT_ID=01234567890
SCHOOL_ID=266
```

You could also use another person's student id to view their schedule instead, provided you have access to that student normally. (E.g. can't view a student from a school unless your user is enrolled at that school)
