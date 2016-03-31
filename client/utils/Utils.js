// const $ = require ('jquery')
// const mergeDefault = require('lodash.defaults');
// const Promise = require('bluebird');
const _ = require('underscore');
const mergeDefault = _.defaults

const Utils = {
  addGCalEvent: function (event) {
    return $.ajax({
      url: '/api/gcal/add',
      method: 'POST',
      data: event
    })
  },

  deleteGCalEvent: function (eventObj) {
    return  $.ajax({
      url: 'api/gcal/delete',
      method: 'DELETE',
      data: eventObj
    })
  },

  getAllSearches: function () {
    // console.log('In getAllSearches');
    return $.ajax({
      url: '/api/searches',
      method: 'GET'
    })
  },

  saveSearch: function (searchObj) {
    var options = {
      url: '/api/searches',
      method: 'POST',
      data: searchObj
    }

      $.ajax(options)    
      .done((data, textStatus) => {
        console.log("Save search succeeded: ", textStatus);
      })
      .fail((error) => {
        console.log("Save search failed: ", error);
        // setState back to prevState
      });
  },

  lowerCaseObjKeys: function (obj) {
    var keys = Object.keys(obj)
    var newObj = {};

    for (var i = 0; i<keys.length;i++){
      var key = keys[i].toLowerCase();
      newObj[key] = obj[keys[i]];
    }
    return newObj;
  },

  getClientIP: function () {
    return $.ajax({
      url: "http://jsonip.com/?callback=?",
      dataType: 'json'
    });
  },

  getJobsFromIndeed: function (query, successCb, errorCb) {

    query = query || {q:'software engineer', l: 'san francisco'};
    var queryStr = {
        publisher: 788696528762292, 
        radius: 200,
        format: 'json',
        limit:25,
        highlight:0,
        v:2,
    };
    //use query as default and add in defaults from queryStr. query is the determining factor in the resulting object
    mergeDefault(query, queryStr);

    var options = {
      url: 'http://api.indeed.com/ads/apisearch',
      method: 'GET',
      dataType: 'jsonp',
      data: query,
      success: (res) => {
        res.results = res.results.map(job => Utils.lowerCaseObjKeys(job));
        console.log('from Utils', res.results);
        // indeedCallback(JSON.stringify(res.results));
        successCb(res);

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
        // console.log(options)
        // make an ajax get request finally
        $.ajax(options);
      })
      .fail((err) => {
        console.log('Failed to get IP')
      })
  },  // Add some logic to enable pagination in redux state and fetch from index based on page

  persistCardsToKanban: function(cardsAndPositions) {
    $.ajax({
      url: '/api/cards',
      method: 'POST',
      data: cardsAndPositions
    })
    .done((result) => console.log('Successfully persisted new cards to Kanban'))
    .fail((error) => console.log('Error while persisting new card data to Kanban: ', error));
  },

  persistCardStatusAndPositions: function(cardStatusAndPositions) {
    return $.ajax({
      url: '/api/cards/positions',
      method: 'PUT',
      data: cardStatusAndPositions
    })
  },

  persistCardStatus: function(newCardStatusInfo) {
    return $.ajax({
      url: '/api/cards/status',
      method: 'PUT',
      data: newCardStatusInfo
    })
  },

  fetchKanbanCards: function () {
    return $.ajax({
      url: '/api/cards',
      method: 'GET',
    })
  }
}
export default Utils;

