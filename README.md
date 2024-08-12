# VacationToday
![Cover](https://github.com/hiirrxnn/VacationToday/blob/main/client/src/assets/LOGO.png)

**VacationToday** : A robust vacation rental website where property owners can list their homes, flats, or rental properties for tourists to book. Travelers can search, book, and manage their vacation accommodations with ease.

## Live Link
<div>
  <a href="https://vacationtodaybyhiren.netlify.app/" target="_blank">Live Link</a>
</div>


## Author
- [Hiren Sharma](https://www.github.com/hiirrxnn)

## About The Project

**VacationToday:** This platform allows property owners to list their vacation homes and provides tourists with a seamless experience to search, book, and manage their bookings. Built with React, Tailwind CSS, Node.js, Express and MongoDB. The frontend runs on Vite (port 5173), and the backend runs on Node.js (port 4001).

![HomePage](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/IndexPage.png)

## Features

1. User Authentication (Login/Register)
2. Search for Vacation Homes
3. Add Your Own Properties
4. Book Homes for Your Vacation
5. View & Manage Your Bookings
6. Edit Your Property Listings
7. View Property Details (Cost, Check-in, Check-out, Max Guests, Pictures, Location, Extra Info)
8. Responsive Design

## Build With

**Client :** _React JS , Tailwind_

**Server :** _Node JS , Express JS_ 

**Database :** _MongoDB_

## Screenshots

1. A vacation home
   ![App Screenshot](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/SinglePlace.png)
2. Vacation home description
   ![App Screenshot](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/Desciption.png)
3. Booking
   ![App Screenshot](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/Booking.png)
4. My Bookings
   ![App Screenshot](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/Bookings.png)
5. My accomodations
   ![App Screenshot](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/MyPlaces.png)
6. New accomodation
   ![App Screenshot](https://github.com/hiirrxnn/VacationToday/blob/main/client/public/SinglePlace.png)

## Prerequisites

Make sure you have the following installed on your system:

Node.js
npm (or yarn)
MongoDB

## Run Locally

Clone the project

```bash
	git clone https://github.com/hiirrxnn/VacationToday
```

Go to the backend project directory

```bash
	cd /api
```

Install dependencies

```bash
	npm install
```

## Usage

- To start the backend server in Development mode

```bash
	cd /api
	node index.js
```

- To start the frontend server in Development mode

```bash
	cd /client
	npm run dev
```

## Environment Variables

Create a **.env** file , in the root directory of the project .

 **.env**

		port=4001	
		mongoURL=mongodb://localhost:27017/ConnectifyDB
		clientURL=http://localhost:5173
		jwtSecret=yourjwtsecret
		apiURL=http://localhost:4001

---
