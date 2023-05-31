# CAPS - The Code Academy Parcel Service

CAPS is an event-driven application that emulates a real-world supply chain system. It simulates a delivery service where vendors can ship products using the CAPS delivery service. When the drivers deliver the packages, each vendor is notified that their customers received what they purchased. The application is written in Node.js and follows an event-driven architecture.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd caps`
3. Install the dependencies: `npm install`

## Usage

1. Start the application: `npm start`
2. The application will run and simulate the interaction between vendors and drivers.
3. Check the console output to see the events and messages generated during the simulation.

## File Structure

The project follows the following file structure:

├── .github
│ ├── workflows
│ │ └── node.yml
├── driver
│ ├── handler.js
│ ├── index.js
│ └── driver-handler.test.js
├── vendor
│ ├── handler.js
│ ├── index.js
│ └── vendor-handler.test.js
├── .eslintrc.json
├── .gitignore
├── eventPool.js
├── hub.js
├── package.json
└── README.md

- `.github/workflows/node.yml`: GitHub Actions workflow configuration for Node.js.
- `driver/handler.js`: Module for managing driver events.
- `driver/index.js`: Entry point for the driver client application.
- `driver/driver-handler.test.js`: Unit tests for the driver event handler.
- `vendor/handler.js`: Module for managing vendor events.
- `vendor/index.js`: Entry point for the vendor client application.
- `vendor/vendor-handler.test.js`: Unit tests for the vendor event handler.
- `.eslintrc.json`: ESLint configuration file.
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `eventPool.js`: Module for the Global Event Pool.
- `hub.js`: Module for managing global package events.
- `package.json`: Project configuration file.
- `README.md`: This file.

## Testing

To run the unit tests, use the following command:

npm test

The tests utilize Jest and test the event handler functions for correctness and expected behavior.

**Note:** The event system in Node.js has already been tested. The purpose of these tests is to verify the connectivity and proper response of your code to the events.

## Contributing

Contributions to CAPS are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request in the repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
