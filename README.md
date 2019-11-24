# OpenEval

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.0.

## Release Notes
### New software features for this release:
  - Pages for students to
    - View active and past surveys
    - Take active surveys
  - Pages for professors to
    - Create new surveys
    - View, edit (by template) and delete created suveys
    - View survey responses (in progress)
### Bug fixes made since the last release:
  - No known bugs. This is the first release.
### Known bugs and defects:
  - Still needs proper login integration
  - No admin functionality yet (in progress)

## Installation Guide  
### Pre-requisites
The [Node.js](https://nodejs.org/en/) JavaScript runtime and its default package manager [npm](https://www.npmjs.com/) are required to install dependencies, build the front-end Angular project and run the back-end server.

For official Node.js and npm installation guide, refer to https://nodejs.org/en/download/.

The front-end project is built using Angular CLI, which can be installed by running the following command in a terminal/console window: (**Note**: This step might require administrator privelege. On Windows, open the console as administrator. On macOS/Linux, type `sudo` in front of the command.)
```bash
npm install -g @angular/cli
```

### Download instructions:
If you have the [Git](https://git-scm.com) version control system installed, you could (shallow) clone this project from GitHub:
```bash
git clone --depth 1 https://github.com/MarcusWilder/open-evaluation.git
```
Or you can simply download the files as a ZIP archive and unarchive it.

### Dependencies 
All dependencies are managed using npm. To download and install all dependencies for a npm project, simply run `npm install` from the root directory of the project.
There are two npm projects in this repository with two separate `package.json` files: One is at the root level, the other is in the `backend` directory.
Make sure to run `npm install` from both directories:
```bash
npm install # Front end
cd backend && npm install # Back end
```
### Build instructions
The front-end Angular application needs to be built from source files. To build, run
```bash
ng serve
```
(**IMPORTANT**: This command should be run from the project *root* directory. This command is not necessary for construction and testing purposes.)

### Run instructions
The above `ng serve` command will not only build the Angular app but also start a development server that serves the app on port 4200. The back-end API server still needs to be started manually. From the project root, run
```bash
cd backend && npm start
```
This will start the API server, which listens on port 4201. Visit `http://localhost:4200` to start using the app.

### Troubleshooting
1. Have you tried turning it off and on again?
2. If you have tried the above solution and the problem still persists, we advise you to purchase a new computer.

## Procedure for Completing Issues

1) Create a branch from the remote repo by navigating to the repo's homepage, and clicking on the 'Branch' button near the top left. Title the branch.

2) If you have not done so with your current local repo, run `git fetch --all` in order to sync all of your local branches to their remote couterparts when you create them.

3) Open your bash terminal, and from the `master` branch, run `git checkout YOURNEWBRANCH`. Make any necessary code changes on that branch and push them to the remote repository when your issue is complete.

4) Once your changes are pushed back to the remote repository, create a pull request for code review. Remember to delete your feature branch after you merge with master.

## Development server

IMPORTANT: Prior to serving this application after cloning the repo, run `npm install` to install all necessary developer dependencies

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
