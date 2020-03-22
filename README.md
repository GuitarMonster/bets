The goal for this app is to create a live sports bet dashboard.
The app was developed usiung latest version of Angular, and Angular Material

## Design

The design was chosen based on the task and on the data provided from the backend.
Main accent was made on simplicity and user experience.
It was decided to use Angular Material components, as they provide all necessary functionality.

## Responsiveness

The app was developed with minimum screen width of 500 pixels in mind.

## Theming

Currently, app has a toggle between light and dark themes. More themes can be implemented in the future.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng test --codeCoverage` to execute tests and generate coverage report.

## Localization

Usually i would use `ngx-translate` to provide translations, but this time i decided to use `native Angular i18n module`.
The Angular approach implies that you should build separate packages with different locale for different countries.
This app has default english as well as polish localization (note that currency format also changes).
Multi-currency could be easily implemented, but it does not make sense, since backend does not provide necessary information (currencyCode)
See commands below to build app for different locales.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `ng serve --configuration=pl` to see polish version of the project
Run `ng serve --prod` to serve in production mode.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 
Use the `--prod` flag for a production build. Use `--localize` flag to generate package for each locale.


