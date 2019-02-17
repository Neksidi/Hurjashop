## Installation :wrench:
- Clone the project: `git clone git@gitlab.hurja.fi:HenkkaH/hurja-shop-client.git` OR `https://gitlab.hurja.fi/HenkkaH/hurja-shop-client.git`
- Install dependencies: `npm install`

## Running
It's recommended to have three simultaneous terminals for running this project

**First terminal:**
- Run the android emulator by navigating to your Android SDK folder and doing `./emulator @yourEmulatorName`

**Second terminal:**
- `npm start --reset-cache`

**Third terminal:**
- `npm run android-dev`: Run in localhost environment
- `npm run android-staging`: Run in staging environment
- `npm run android-production`: Run in production environment
