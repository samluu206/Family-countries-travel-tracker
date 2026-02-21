
<!-- Improved compatibility of back to top link: See: [chiquan2005/Family-countries-travel-tracker](https://github.com/chiquan2005/Family-countries-travel-tracker) -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


  <h3 align="center">Family countries travel tracker</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up and run the Family Countries Travel Tracker locally.

### Prerequisites

* Node.js (v14 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```
* A Neon account (free tier available at https://neon.tech)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/chiquan2005/Family-countries-travel-tracker.git
   cd Family-countries-travel-tracker
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Set up Neon Database

   a. Go to https://neon.tech and create a free account

   b. Create a new project

   c. Copy your connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

   d. In your Neon SQL Editor, run the following SQL to set up your database:

   ```sql
   -- Create countries table (you'll need to import country data)
   CREATE TABLE countries (
     country_code CHAR(2) PRIMARY KEY,
     country_name VARCHAR(100) NOT NULL
   );

   -- Create users table
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(15) UNIQUE NOT NULL,
     color VARCHAR(15)
   );

   -- Create visited_countries table
   CREATE TABLE visited_countries (
     id SERIAL PRIMARY KEY,
     country_code CHAR(2) NOT NULL,
     user_id INTEGER REFERENCES users(id)
   );

   -- Insert initial users
   INSERT INTO users (name, color)
   VALUES ('Angela', 'teal'), ('Jack', 'powderblue');

   -- Insert some sample visited countries
   INSERT INTO visited_countries (country_code, user_id)
   VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2);
   ```

4. Configure Environment Variables

   Create a `.env` file in the root directory:
   ```sh
   cp .env.example .env
   ```

   Edit `.env` and add your Neon connection string:
   ```
   DATABASE_URL=your_neon_connection_string_here
   PORT=3000
   NODE_ENV=development
   ```

5. Start the application
   ```sh
   node index.js
   ```

6. Open your browser and navigate to `http://localhost:3000`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This app allows you to track the countries that your family has visited.

### Features:
- Add countries by typing the country name
- Switch between family members to view their visited countries
- Add new family members with custom colors
- Each family member has their own list of visited countries
- Visual map showing all visited countries

### How to Use:
1. Select a family member from the user buttons
2. Type a country name and click "ADD" to add it to their visited countries
3. Click "Add Family Member" to create a new user with a custom name and color

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment

### Deploy to Render (Recommended)

1. Push your code to GitHub

2. Go to https://render.com and sign up/login

3. Click "New +" and select "Web Service"

4. Connect your GitHub repository

5. Configure the service:
   - Name: family-travel-tracker
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node index.js`

6. Add Environment Variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string

7. Click "Create Web Service"

Your app will be live at `https://your-app-name.onrender.com`

### Deploy to Railway

1. Go to https://railway.app and sign up/login

2. Click "New Project" > "Deploy from GitHub repo"

3. Select your repository

4. Add your Neon `DATABASE_URL` as an environment variable

5. Railway will automatically detect Node.js and deploy

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`

2. Run `vercel` in your project directory

3. Add environment variable in Vercel dashboard:
   - `DATABASE_URL`: Your Neon connection string

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
- [x] Add color
- [x] Add multi user feature
- [ ] Add Changelog
- [ ] Add back to top links
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Chi Quan Luu  - luuchiquan2005@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/chiquan2005/Family-countries-travel-tracker.svg?style=for-the-badge
[contributors-url]: https://github.com/chiquan2005/Family-countries-travel-tracker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chiquan2005/Family-countries-travel-tracker.svg?style=for-the-badge
[forks-url]: https://github.com/chiquan2005/Family-countries-travel-tracker/network/members
[stars-shield]: https://img.shields.io/github/stars/chiquan2005/Family-countries-travel-tracker.svg?style=for-the-badge
[stars-url]: https://github.com/chiquan2005/Family-countries-travel-tracker/stargazers
[issues-shield]: https://img.shields.io/github/issues/chiquan2005/Family-countries-travel-tracker.svg?style=for-the-badge
[issues-url]: https://github.com/chiquan2005/Family-countries-travel-tracker/issues
[license-shield]: https://img.shields.io/github/license/chiquan2005/Family-countries-travel-tracker.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/chiquan2005/Family-countries-travel-tracker/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
