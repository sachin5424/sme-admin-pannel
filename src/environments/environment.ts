// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const baseUrl = "http://3.109.249.64:3000/admin/"
export const environment = {
  api_url:"http://3.109.249.64:3000/",
  production: false,
  category_all_list:baseUrl+"category/list/ALL",

  category_save:baseUrl+"category/save",
  category_delete:baseUrl+"category/delete",
  author_all_list:baseUrl+"author/list/ALL",
  author_delete:baseUrl+"author/delete",
  save_author_list:baseUrl+"author/save",
  news_save:baseUrl+"news/save",
  comment_list:baseUrl+"comment/list/ALL",
  ads_all_list:baseUrl+"ads/list/ALL",
  video_list:baseUrl+"video/list/ALL",
  video_save:baseUrl+"video/save",
  ads_save:baseUrl+"ads/save",
  magazine:baseUrl+"magazine/list/ALL",
  magazineSave:baseUrl+"magazine/save",
  adminLogin:baseUrl+"user/login",
  category_delete_many:baseUrl+"category/delete-many",
  author_multi_delete:baseUrl+"author/delete-many",
  contactUs:baseUrl+"contactus/list/ALL",
  contactUsSave:baseUrl+"contactus/save",
  deleteMany:baseUrl+"contactus/delete-many",
  deleteOne:baseUrl+"contactus/delete",
  fileSave:baseUrl+"file/save",
  magazineDelete:baseUrl+"magazine/delete",
  magazineMany:baseUrl+"magazine/delete-many",
  videoDeleteOne:baseUrl+"video/delete",
  videoDeleteMany:baseUrl+"video/delete-many"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
