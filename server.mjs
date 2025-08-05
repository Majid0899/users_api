import express from "express";

/* Create a express app */
const app = new express();

/**Middleware using for parsing json */
app.use(express.json());

/*Users Data **/
const users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
  {
    id: "2",
    firstName: "Ajay",
    lastName: "Mishra",
    hobby: "Travelling",
  },
  {
    id: "3",
    firstName: "Ansh",
    lastName: "Sharma",
    hobby: "Coding",
  },
  {
    id: "4",
    firstName: "shikha",
    lastName: "Tiwari",
    hobby: "Teaching",
  },
];

/**
 * Function to find user
 * Accept : Parameter id
 * return a user object
 *
 */
const findUser = (id) => {
  const user = users.find((user) => user.id == id);
  return user;
};

/*Logger MiddleWare */

const logger = (req, res, next) => {
  const start = Date.now(); // optional: track request time

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] Method:${req.method} URL:${
        req.originalUrl
      } Status Code- ${res.statusCode} (${duration}ms)`
    );
  });

  next(); // continue to the next middleware
};

/*Validation MiddleWare */
const validateFields = (req, res, next) => {
  const { firstName, lastName,hobby} = req.body;
  if(req.method==="PUT"){
    if(!firstName && !lastName && !hobby){
      return res.status(400).json({message:"Validation Error!! Atleast one field are required"})
    }
  }

  if(req.method==="POST"){
  if (!firstName || !lastName || !hobby) {
    return res
      .status(400)
      .json({
        message: "Validation Error : FirstName , LastName and Hobby  are required !!!!",
      });
  }
}
  next();
};

/** Application Level Middleware */
app.use(logger);

/* Print the Welcome message on browser */
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center'>Welcome to our Users Managment API</h1>"
  );
});

/* Get all users */
app.get("/users", (req, res) => {
  try {
    res.status(200).json({ users, message: "Success" });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
});

/* Get specific user */
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  try {
    //get the user
    const user = findUser(id);
    //Check the user is present or not
    if (!user) {
      return res.status(404).json({ message: `User with ${id} Not found` });
    }
    //give the user
    res.status(200).json({ user, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Add the user with route level Middleware */
app.post("/user", validateFields, (req, res) => {
  try {
    //get the data from req body
    const user = req.body;

    //Adding data to users
    users.push({ ...user, id: users.length + 1 });

    res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*Update  the users */

app.put("/user/:id", validateFields, (req, res) => {
  const id = req.params.id;
  try {
    //get the user
    const user = findUser(id);

    //Check the user is present or not
    if (!user) {
      return res.status(404).json({ message: `User with ${id} Not found` });
    }
    /*Update only fields which are provided in request body
     *Get the keys from req.body using Object.keys()
     *Iterate the keys and update the value.
     */
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
      user[key] = req.body[key];
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Delete user */

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  try {
    //Get the user
    const user = findUser(id);
    //Check the user is present or not
    if (!user) {
      return res.status(404).json({ message: `User with ${id} Not found` });
    }
    /**Remove the user using index find with user */
    users.splice(parseInt(id) - 1, 1);
    res.status(200).json({ users, message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* app listen port */
app.listen(5000, () => {
  console.log("SERVER IS RUNNING ON PORT:5000");
});
