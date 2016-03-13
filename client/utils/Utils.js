// const $ = require ('jquery')
// const mergeDefault = require('lodash.defaults');
// const Promise = require('bluebird');
const mergeDefault = _.defaults

const Utils = {
  lowerCaseObjectKeys: function (obj) {
    var keys = Object.keys(obj);
    var l = keys.length;
    var newObj = {};
    while(l--){
      let key = keys[l];
      newObj[key.toLowerCase()] = obj[key];
    }
    return newObj;
  },
  
  getClientIP: function () {
    console.log('jquery is: ', $)
    return $.ajax({
      url: "http://jsonip.com/?callback=?",
      dataType: 'json'
    });
  },

  getJobsFromIndeed: function (query, successCb, errorCb) {

    query = query || {q:'software engineer', l: 'san francisco'}
    var queryStr = {
        publisher: 788696528762292, 
        radius: 200,
        format: 'json',
        limit:25,
        v:2,
    }
    //use query as default and add in defaults from queryStr. query is the determining factor in the resulting object
    mergeDefault(query, queryStr);

    var options = {
      url: 'http://api.indeed.com/ads/apisearch',
      type: 'GET',
      dataType: 'jsonp',
      data: query,
      success: (res) => {
        console.log('Got data from server in getJobsFromIndeed');
        // indeedCallback(JSON.stringify(res.results));
        successCb(JSON.stringify(res));

      },
      error: (err) => {
        console.log('Error in getJobsFromIndeed');
        errorCb(err);
      }
  }
    // makes the call with above options.
    // Indeed requires the client IP
    Utils.getClientIP()
      .done((data) => {
        options.data.userip = data.ip;
        console.log(options)
        // make an ajax get request finally
        $.ajax(options)
      })
      .fail((err) => {
        console.log('Failed to get IP')
      })
  }  // Add some logic to enable pagination in redux state and fetch from index based on page
}
// module.exports = Utils;

Utils.getJobsFromIndeed({q:'plumber'}, (res) => $('body').text(res), null);
