# [Countries of the World App](http://countries.dagasoft.com) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)

A simple application to view the countries of the world using the [REST Countries API](https://restcountries.eu/) written in React and Redux.

## On mac or linux you can run this local by doing the following:
1. Install Docker
2. Install git
3. Install [Opctl](https://opctl.io/docs/getting-started/opctl.html)
5. Open a terminal
6. Run: git clone https://github.com/danielgarcia/Countries-of-the-World
7. cd Countries-of-the-World
8. Run: opctl run debug
   - It will download the needed containers and run them.
   - It will build the frontend bundle.
   - It will launch the bundle on an Nginx container.
9.  You are done, use http://localhost/

## To stop the service
1. Ctrl+C on the terminal.
   - This will stop and remove the containers.

## Screenshots

### Homepage
<p align='left'>
<img src='https://raw.githubusercontent.com/danielgarcia/Countries-of-the-World/master/homepage.png' width='600' alt='Homepage'>
</p>

### Country Page
<p align='left'>
<img src='https://raw.githubusercontent.com/danielgarcia/Countries-of-the-World/master/country_page.png' width='600' alt='Countries Page'>
</p>