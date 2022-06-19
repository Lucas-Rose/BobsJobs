## Bob's Jobs Backend Server Integrated Webpage!

This project was in close relation to the work I was doing in COMP2110 Web Technology.

This webpage uses the MVC Framework to deliver a dynamic webpage purposed for displaying jobs and information about these particular Jobs.

# Features that this webpage currently has working:

- Usable search bar, allowing users to search through data within the webpage to find jobs relevant to the term they searched.
- Backend Server (Strapi & Rest API) to store and update data to be displayed on the webpage for user access.
- Router splitHash to allow javascript generated HTML on the HTML file to allow dynamic changes on information to be displayed properly.


# Features still in progress

- Posting information tot he Backend server to allow for user authentication and changes to be made to the database (specifically Job Applications)

# How to use

- Package.json allows for the following commands to be run via the terminal
    - 'npm run backend' to allow for the Strapi Database to load using the JSON Data file in the backend folder. 
    - 'npm run frontend' to allow the localhost server to now access the information in the Strapi Database and display the website and relevant information. 

Lucas Rose