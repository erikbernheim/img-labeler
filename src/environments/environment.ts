// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  colors: [
    {name: 'Road', color: '#402020'},
    {name: 'Lane Markings', color: '#ff0000'},
    {name: 'Undrivable', color: '#808060'},
    {name: 'Movable', color: '#00ff66'},
    {name: 'My Car', color: '#cc00ff'}
  ],
  defaultImage: 'https://raw.githubusercontent.com/commaai/comma10k/master/imgs/0005_836d09212ac1b8fa_2018-06-15--15-57-15_23_345.png',
  defaultImageNumber: '0005',
  imageDirectory: 'https://raw.githubusercontent.com/commaai/comma10k/master/imgs/',
  imageDirectoryName: 'imgs',
  maskDirectoryName: 'masks'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
