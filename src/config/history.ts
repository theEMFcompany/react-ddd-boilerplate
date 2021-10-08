let history;
if(process.env.NODE_ENV=='production'){
    history = require('history/createBrowserHistory').createHistory
 }else{
    history = require('history/createHashHistory').createHistory
 }

export default  history;
