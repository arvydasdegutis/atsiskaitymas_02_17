const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { createUser, getUserById, getUserByUsername, getAllUsers, updateUser, deleteUser, getUserByEmail } = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production" ? true : false, 
    sameSite: "lax",
  };

  console.log("Setting JWT Cookie:", cookieOptions); 

  res.cookie("jwt", token, cookieOptions);
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;

    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;
    newUser.role = 'user';
    
    const createdUser = await createUser(newUser);


    const token = signToken(createdUser.id);
    sendCookie(token, res);

    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      throw new AppError(401, "User not found, please sign up");
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      throw new AppError(401, "Incorrect password");
    }

    const token = signToken(user.id);
    sendCookie(token, res);

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: "success",
      data: user,
      email,
    });
  } catch (error) {
    next(error);
  }
};


exports.protect = async (req, res, next) => {
  try {



    if (!req.cookies?.jwt) {
      throw new AppError(401, "You are not logged in");
    }

    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);


    const currentUser = await getUserById(decoded.id);
    if (!currentUser) {
 
      throw new AppError(401, "User not found");
    }


    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};




exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new AppError(403, "You do not have permission to perform this action");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};


exports.getAllUsers = async (req, res, next) => {
  try {
    const usersList = await getAllUsers();
    res.status(200).json({
      status: "success",
      data: usersList,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.params.username);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { username, name, surname, role } = req.body;

    if (!username || !name || !surname) {
      throw new AppError(400, "Missing required fields: username, name, or surname");
    }

    const newUser = await createUser({ username, name, surname, role });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { username, name, surname, role } = req.body;
    const { id } = req.params;

    const updatedUser = await updateUser(id, { username, name, surname, role });

    if (!updatedUser) {
      throw new AppError(404, "User not found or not updated");
    }

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);

    if (!deleted) {
      throw new AppError(404, "User not found");
    }

    res.status(204).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


//logout

exports.logout = (req, res) => {
  return res.clearCookie('jwt').status(200).json({
    message: 'You are logged out',
  });
};

exports.getAuthenticatedUser = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(401, "User not authenticated");
    }



    const authdUser = { ...req.user };
    if (authdUser.password) {
      authdUser.password = undefined; 
    }

    res.status(200).json({
      status: "success",
      data: authdUser,
    });
  } catch (error) {
    next(error);
  }
};

