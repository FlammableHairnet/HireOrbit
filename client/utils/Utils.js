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

  getSavedSearch: function (id) {
    return $.ajax({
      url: '/api/searches/'+id,
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
        radius: 25,
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

  persistCardPositions: function(cardPositions) {
    return $.ajax({
      url: '/api/cards/positions',
      method: 'PUT',
      data: cardPositions
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
  },

  sendUrlToParse: function (sendUrlToParse) {
    var sendUrl = {urlToParse: sendUrlToParse}
    return $.ajax({
      url: '/api/parse',
      method: 'POST',
      data: sendUrl
    });
  },

  deleteCardFromKanban: function(card_id, card_positions, eventIdsForRemoval) {
    return $.ajax({
      url: '/api/cards',
      method: 'DELETE',
      data: {
        card_id,
        card_positions,
        eventIdsForRemoval
      }
    })
  },

  updateCardNotes: function(card_id, notes) {
    return $.ajax({
      url: 'api/cards/notes',
      method: 'POST',
      data: {
        card_id,
        notes
      }
    });
  },

  updateCardRating: function(card_id, newRating) {
    return $.ajax({
      url: 'api/cards/rating',
      method: 'PUT',
      data: {
        card_id,
        newRating
      }
    })
  }
}

export default Utils;

