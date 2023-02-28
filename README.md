# Server of CompanyX-
This is the server-side of a project made using the MERN stack. The website can be accessed at https://companyxweb.netlify.app, and the client-side repository can be found at https://github.com/Sidharthkp/CompanyX-Client-.git. The project mainly focuses on three modules, which include Admin, Employee, and HR.

## Admin
1. The Admins can view the Dashboard which handles all the datas infographically.
2. Admins can post the banner and delete the banner.
3. Admins can block/unblock users who is loging in to the website.
4. Admins can also view the salary details of the employees.

## HR
1. HR is the one who generates salary slips to employees.
2. HR can view all salaries provided to each employees.

## Employee
1. Employee can view and export the data (salary slip).
2. All the salary slips can be accessed by just searching the date of salary issued in the search bar.

## Installation

To install and run this project, follow these steps:

1. Clone this repository: `git clone https://github.com/Sidharthkp/CompanyX-Server-.git`
2. Navigate to the project directory: `cd CompanyX-Server-`
3. Install the dependencies: `npm install`
4. Create a `.env` file in your root folder and create the key value pair for connection to the MongoDB database eg: `MONGO_URL: "mongodb+srv://: xyz.mongodb.net/?retryWrites=true&w=majority"`
5. And provide some dummy datas for user login which holds the user details:
   Create a collection named `user` and import the json file `users.json` which is provided inside the project directory `cd /public/userCollection`
7. Run the project: `npm run dev`

## Contact

If you have any questions or comments about this project, please email me at sidharthkannan20@gmail.com.

API documenation link - https://documenter.getpostman.com/view/24147495/2s93CLtEHw
