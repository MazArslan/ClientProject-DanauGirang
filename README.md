# Wildlife.DATA

## Setup

### Client and Web Server
:one: In the project root, open your favourite terminal

:two: Run `npm install`

:three: Get your local Mongodb instance running

:four: Back in your project's terminal again, run `npm run migrate`

:five: Test that everything is good by running `npm run dev` and then in a browser, go to `localhost:8080`

### AI Python Server
:one: Install Anaconda Python 3.7 (Python Data Science Bundle) from "https://www.anaconda.com/"

:two: Open a Anaconda prompt

:three: On the Anaconda prompt, navigate to the AI folder thats in the root project folder.

:four: Run the following command in the Anaconda prompt: ``` conda env create --file environment.yml ```

:five: Run the following command in the Anaconda prompt: ``` conda activate cameratraps ```

:six: Run the following command in the Anaconda prompt: ``` pip install -r requirements.txt ```

:seven: Run the following command in the Anaconda prompt: ``` pip3 install -r requirements.txt ```

:eight: Run the following command in the Anaconda promt: ``` python server.py ```

The server should now be running on port 5000.
To close the server press CTRL + C
To deactivate the virtual evironment, run the command: ```conda deactivate ```




## Database migrations

Used once you make changes to the database structure. So that we are all working from the same database version.

The migration folder is under source control.

:one: Open terminal and cd into server

:two: Run `npm run create-migration -- name-of-migration`

:three: Run `npm run migrate`

## Environment variables

DATABASE_DEV_LINK

Is the Mongo Atlas URL link to the database

CAMERA_TRAP_RELATIVE_PATH

Is relative to the server/index.js file. Is the path pointing to the camera trap images.

## Available commands

### npm run dev

Concurrently runs both the client and server in development mode.

### npm run client

Runs just the client in development mode.

### npm run server

Runs just the server in development mode.

### npm run test-client

Analyses the project to find files with the naming convention <name>.test.js and runs the tests.

Run the command followed by `-- -u` to update the snapshots.

### npm ruun test-server

Runs the server side Jest tests.

### npm run client-lint

Runs the linter on the client

### npm run server-lint

Runs the linter on the server

### npm run eslint-check

Modify the line to point towards the desired file. Will determine whether there are any conflicting rules between eslint and prettier.

### npm run build

Does a webpack production build. Not needed when developing the app.

### npm run build:analyze

Generates build reports. WIP

### npm run start

Runs the production build.
