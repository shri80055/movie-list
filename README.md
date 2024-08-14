# MovieHub Project

This is a movie browser application built with React that allows users to browse movies by year and filter by genre.

Live Link - https://codingwizard.site/


## Features
- The list of genres should come from an API.
- Scroll Down to load Next movies by year.
- Scroll Up to load Previous movies by year.
- Filter movies by genre.
- Skeleton loading for better user experience.
- Unique loader animation before the page loads.

## Requirements Covered
- Scroll Down to load Next movies by year with infinite scroll.
- Filtering movies by genre.
- Users should be able to select multiple genres.
- Displaying a loader before page content is loaded.
- Using a skeleton loader while movies are being fetched.
- Ensure the interface is mobile-friendly and visually appealing.

## Requirements Not Covered
- Scroll Up to load Previous movies by year with infinite scroll.
- When user Scroll Down only 2013 Year Movies Section are not Visible

## Installation

To run this project locally, follow these steps:

Ensure you have the following installed on your local development environment:
Node.js (v14 or above)
npm or Yarn (Yarn is preferred)

1. Clone the repository:
   
   git clone https://github.com/shri80055/movie-list.git
   
2. Navigate to the project directory:

   cd movie-list

3. Install dependencies:
   
   yarn install
   
   yarn add axios
   
   yarn add axios react-infinite-scroll-component
   
   yarn add react-loading-skeleton
   
5. Start the development server:
   
   yarn start

6. Open the application in your browser:
   
   http://localhost:3000
