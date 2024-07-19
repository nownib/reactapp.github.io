import "./Home.scss";

const Home = (props) => {
  return (
    <>
      <div className="Overview">
        <div className="container">
          <h3>Overview</h3>
        </div>
        <div className="space container">
          <h5>Backend with Node.js and Express </h5>
          <p>
            Create Server Backend: Use Node.js and Express to build a robust and
            flexible web server.
          </p>
          <p>
            MVC Model: Apply the MVC pattern to organize the source code
            clearly, making it easier to manage and maintain.
          </p>
        </div>
        <div className="space container">
          <h5> CRUD Operations</h5>
          <p>
            <p>
              Create Users: Create new users and store information in the
              database, including hashing passwords with bcrypt for security.
            </p>
            <p>
              Read Users: Display the list of users by integrating Bootstrap
              Table and rendering data with EJS.
            </p>
            <p>
              Update Users: Create a page to update user information, including
              filling the user's information into the form and updating the
              database.
            </p>
            <p>
              Delete Users: Use a form to delete users and efficiently manage
              access rights.
            </p>
          </p>
        </div>
        <div className="space container">
          <h5> ORM and Sequelize</h5>
          <p>
            Install ORM: Use the Sequelize library to work with the database
            conveniently and effectively.
          </p>
          <p>
            Create Models, Migrations, and Seeders: Create tables in the
            database, generate fake data, and manage database schema changes.
          </p>
        </div>
        <div className="space container">
          <h5>Responsive Interface with Bootstrap</h5>
          <p>
            Integrate Bootstrap 5: Split layout and create a responsive
            interface, including forms to add new users and display the user
            list.
          </p>
          <p>
            Create Models, Migrations, and Seeders: Create tables in the
            database, generate fake data, and manage database schema changes.{" "}
          </p>
          <p>
            Responsive Design: Design the interface to be compatible with
            various devices, from mobile phones to desktops.
          </p>
        </div>
        <div className="space container">
          <h5> React and React Router</h5>
          <p>
            Setup React Project: Configure the React project and integrate tools
            like SCSS and React Router.
          </p>
          <p>
            Page Navigation: Create a navigation bar and page routing with React
            Router, combined with Bootstrap 5 for an attractive interface.
          </p>
          <p>
            State Management and Form Handling: Control form data with state and
            handle form submit events.
          </p>
        </div>
        <div className="space container">
          <h5>APIs and Axios</h5>
          <p>
            Call APIs from React: Use Axios to call APIs from the client side,
            including creating, reading, updating, and deleting user data.
          </p>
          <p>
            Handle CORS Errors: Resolve issues related to Cross-Origin Resource
            Sharing (CORS) when calling APIs from the client side.
          </p>
        </div>
        <div className="space container">
          <h5> Security with JWT</h5>
          <p>
            JSON Web Token (JWT): Create and verify JWT to manage user session
            logins, store tokens as cookies, and check user permissions.
          </p>
          <p>
            Middleware and Cookies Parser: Integrate middleware to handle
            cookies and check the login status of users.
          </p>
        </div>
        <div className="space container">
          <h5> Role Management and Permissions</h5>
          <p>
            Design and Assign Permissions: Create an interface to add and manage
            user permissions, assign permissions to user groups, and display the
            list of permissions.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
