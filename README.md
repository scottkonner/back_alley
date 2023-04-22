<h1>Back Alley </h1>

<p>
Back Alley is an app designed to get people the best deal possible for the games they want the most.  Pulling data from CheapShark's API, we allow users to make posts on games to notify others of any sort of sale going on.  These games can then be added to a shopping cart and purchased, or added to a wishlist to more easily keep tabs on them.
</p>


<p></p>
<h1>CRUD Features</h1>
This app includes full CRUD (Create, Read, Update, Delete) features for both the postings of the games as well as the reviews of those games. There are partial curds for a shopping cart and wishlist, though these will eventually be turned into full CRUDs. Additionally, users will be able to use a search bar to seek out the games they want, or can parse through a large list if that is their choosing.



<p></p>
<p></p>
<h1 align=left>To Get Started </h1>

<p>Clone the repository and navigate to the project directory.  From there, run npm install to install all necessary dependencies within the react-app folder.</p>
<p>Create a .env file and add the following variables:</p>
<ul align=-left>
   <li>SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230</li>
   <li>DATABASE_URL=sqlite:///dev.db</li>
   <li>SCHEMA=flask_schema</li>
</ul>

<p>To build or reset the database and run seeders, run the following comands in the root folder IN ORDER. </p>
<ol align=-left>
   <li>pipenv shell</li>
   <li>flask db upgrade</li>
   <li>flask seed all</li>
</ol>

<p>once you've run those three commands, start up the back end server in ther root directory by running flask run (make sure you're in your pipenv shell) head to the react-app folder and run npm start.
The application should now be running on the port specified in your .env file.
Please note that the above instructions assume that you have the necessary dependencies installed on your machine. If you are missing any dependencies, please refer to their respective documentation to learn how to install them. </p>


<h2 align=center>Technologies</h2>
<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" style=width:75px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style=width:50px />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style=width:50px />
</div>
