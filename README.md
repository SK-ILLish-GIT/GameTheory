Here’s a template for your `README.md` file to document and showcase your project, including deployment on GitHub. You can modify it according to your project's specific requirements.

---

# SK's Sports Centre - Slot Booking System

A web-based slot booking system for sports centers, allowing users to browse available courts and book slots based on their preferences. This project uses React.js and Chakra UI for the frontend, with a backend API to fetch data and handle booking operations.

## Features

- **Dynamic Slot Booking**: Users can select centers, sports, courts, and available time slots for booking.
- **Real-time Availability**: Slots are updated in real-time based on court and date selection.
- **Responsive Design**: Fully responsive design built using Chakra UI to ensure seamless experience across devices.
- **User Authentication**: Authentication implemented for secure bookings (requires user login).


## Screenshots

### Main Booking Interface
![image](https://github.com/user-attachments/assets/d1edc3f3-a529-4801-a55e-e324182da6fc)

## Live Website :
FrontEnd : https://game-theory-imu4wwaga-skillishgits-projects.vercel.app/login

BackEnd : https://gametheory-9xjf.onrender.com

Report :[ https://drive.google.com/file/d/1l_0rhZgxs2FK8jHkyU85nPDUqpX5OH9Y/view?usp=sharing](https://drive.google.com/file/d/1l_0rhZgxs2FK8jHkyU85nPDUqpX5OH9Y/view)

## Installation

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (version 14.x or higher)

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/...
    cd sports-booking-system
    ```

2. **Install dependencies**:
    Using NPM:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3. **Run the development server**:
    ```bash
    npm start
    ```
    Or with Yarn:
    ```bash
    yarn start
    ```


5. **Access the application**:
   The app will be available at `http://localhost:3000` in your browser.

## Folder Structure

```
src/
│
├── components/
│   ├── ScheduleGrid.jsx       # Main component for handling slot booking
│
├── AuthContext.js             # Context for user authentication
├── utils/
│   ├── dateUtils.js           # Utility for generating dynamic date ranges
│
├── App.js                     # Main App component
├── index.js                   # Entry point of the React application
│
└── styles/
    └── ScheduleGrid.css        # Custom CSS for ScheduleGrid component
```

## Deployment

To deploy this project on GitHub Pages:

1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add the following scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
## Technologies Used

- **React.js**: For building the user interface.
- **Chakra UI**: For modern and responsive UI components.
- **CSS**: Custom styling for the booking interface.
- **Context API**: For managing authentication state globally.
- **Node.js & Express (Backend)**: REST API endpoints for fetching center, sport, court, and booking data.

## API Endpoints

- **GET** `/api/centre/getCentre`: Fetch available sports centers.
- **GET** `/api/sport/getSport`: Fetch sports based on the selected center.
- **GET** `/api/court/getCourt`: Fetch courts based on the selected sport and center.
- **GET** `/api/schedule/availableSlots`: Get available time slots for a court.
- **POST** `/api/booking/createBooking`: Book a selected time slot.

---

Feel free to modify the content, add any additional sections (e.g., testing, troubleshooting), or personalize it based on your project!
