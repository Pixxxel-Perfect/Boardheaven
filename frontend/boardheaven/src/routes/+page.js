// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
//export const prerender = true;

// BEGIN: ed8c6549bwf9
// Add '_' prefix to the function name to make it a valid export
export function _handleButtonClick() {
  console.log('It works');
}
