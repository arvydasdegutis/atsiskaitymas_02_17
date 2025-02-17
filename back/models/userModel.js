const { sql } = require("../dbConnection");

exports.createUser = async ({ name, email, password, role }) => {
  const [user] = await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${name}, ${email}, ${password}, ${role})
        RETURNING *
    `;
  return user;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
        SELECT * FROM users WHERE id = ${id}
    `;
  return user;
};

exports.getUserByUsername = async (username) => {
  const [user] = await sql`
        SELECT * FROM users WHERE username = ${username}
    `;
  return user;
};

exports.getUserByEmail = async (email) => {
    const [user] = await sql`
          SELECT * FROM users WHERE email = ${email}
      `;
    return user;
  };

exports.getAllUsers = async () => {
  return await sql`
        SELECT * FROM users ORDER BY username ASC
    `;
};

exports.updateUser = async (id, { username, name, surname, role }) => {
  const [updatedUser] = await sql`
        UPDATE users
        SET username = ${username}, name = ${name}, surname = ${surname}, role = ${role}
        WHERE id = ${id}
        RETURNING *
    `;
  return updatedUser;
};

exports.deleteUser = async (id) => {
  const deleted = await sql`
        DELETE FROM users WHERE id = ${id} RETURNING *
    `;
  return deleted.length > 0;
};
