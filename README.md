# react-webix #

Example of using webix libraby in react application.

### How do I get set up? ###

* npm install
* bower install
* npm start


#### TODO List ####

* updating could be improved: 
  for example:
  if only data was updated - table.clearAll() && table.parse(newData)
  if only columns were updated  - table.refreshColumns(newCols, true)
  if only size was updated - table.config.width = newWidth; table.resize();
  other - rerender table


##### Refs

* based on [React and Webix: Combining the Two Technologies](http://xbsoftware.com/blog/react-and-webix-combining-two-technologies/) article
* with [source](https://bitbucket.org/ilyabasiuk/react-webix/src) code