// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_TITLE: 'Fish category',
  PATH_FISHES: '/fishes',
  FISHES: 'fishes',
  FISH_ID: 'fishId',
  PATH_MAIN: '',
  PATH_FISH_DETAIL: 'fish/:fishId',
  PATH_FISH_ADD: 'addFish',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
