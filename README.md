# Habit Tracker

This is a Full stack Web application for adding Habits and tracking them. This web application has been built by using HTML, CSS, JavaScript, Nodejs, MongoDB and few Libraries of JavaScript.

The Home page displays the Habits that you have added in the past and gives you an option to add more habits.
You can click on any Habit to view it's details and track it. You can also delete any habit if you want.
On the View habit page you can select date from when to when you want to see track record of the Habit by selecting the dates from the Date field. You can also click on any date in the list to mark it as done, not done or leave it unmarked.

## How to Use

- Use the Git repository to clone this Project from the Github.
- After cloning you need to install required packages and libraries using 'npm install' .
- Then use npm start command in your terminal to run the server and connect to the Database.
- Use http://localhost:8000/ to open the home page of this application.
- You can add Habits to your list. You can delete any already added Habit as well.
- Click on any already added Habit to see the track recrod of that Habit.
- You can select the dates from when to when you want to see the track record of that Habit.
- You can click on the list of dates to mark the Habit as done or not done for that particular day.

## Features

- Home page includes all the habits you have added. You can Add or Delete any habit from here.
- Habits page here you can mark a particular habit for a date marked or not. Here you can also search by dates.

## Requirements

- Browser
- Internet connection

## Github repository for this App

- Use this link to try out my Web App - https://github.com/abhi3s6y9/Habit-Tracker

## Directory Structure

- This Project follows MVC model of the Fullstack web development
- It contains following folders and files

  - Model - habit.js for defining the Schema
  - View - layout.ejs (to place the partials) , home.ejs (to configure body of our home page) and habit.ejs (to configure the view-habit page i.e. details of any habit)
  - Controller - homeController.js (to configure the functionality of the components of our web application). Router i.e. index.js (to define the routes based on the postfix of the url)
  - assets - for Static files (css, scss, js files, images, etc)
