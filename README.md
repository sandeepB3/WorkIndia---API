# WorkIndia SDE API Round - IRCTC
To design a railway management system like IRCTC,

## Features
- Admin - can perform all operations like adding trains, updating total seats in a train, etc.
- Login users - can check availability of trains, seat availability, book seats, get booking details, etc.

## Tech Stack
- Server: Node.js(Express)
- Database: MySQL

## API References

| API | Description|
| :-------- | :------- | 
| `/api/admin/login` | `To allow admins to login` | 
| `/api/admin/login | `For admins to add trains` | 
| `/api/users/signup` | `To register users` | 
| `/api/users/login` | `To login users` | 
| `/api/users/logout` | `To logout users` | 
| `/api/users/availability` | `To check train availability` |

## TO DO
- apiKeyMiddleware
- Book a Seat
- Get Specific Booking Details
- Adding Trains (Implemented but not working)
- Get Trains (Implemented but not working)

