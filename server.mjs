import express from "express";

/* Create a express app */
const app = new express();

/**Middleware using for parsing json */
app.use(express.json());

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

const findUser = (id) => {
  const user = users.find((user) => user.id == id);
  return user;
};

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
    res.status(200).json({ user, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Add the user */
app.post("/user", (req, res) => {
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

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  try {
    //get the user
    const user = findUser(id);

    //Check the user is present or not
    if (!user) {
      return res.status(404).json({ message: `User with ${id} Not found` });
    }
    /*Update only fields which are provided in request body*/
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
    //Remove the user from users 
    users.splice(parseInt(id)-1,1)
    res.status(200).json({users,message:"Successfully Deleted"})

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* app listen port */
app.listen(5000, () => {
  console.log("SERVER IS RUNNING ON PORT:5000");
});
