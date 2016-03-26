import { actions } from '../constants';

var dataset = [
				{
        	location: "San Francisco, ca",
          totalResults: 7323,
					query : "software engineer"
       	},
        {
        	location: "Los Angeles, ca",
        	totalResults: 1630,
					query: "web developer"
        },
        {
        	location: "San Jose, ca",
        	totalResults: 119,
					query: "massage therapist"
        },
        {
        	location: "Sunnyvale, ca",
        	totalResults: 9660,
					query: "software engineer"
        },
        {
        	location: "New York, ny",
        	totalResults: 1027,
					query: "front End Web Developer"
        }
		];


export function updateCardStatus(card_id, status) {
  return {
    type: actions.UPDATE_CARD_STATUS,
    payload: {
      card_id,
      status
    }
  }
}

export function updateCardPosition(hoverCardId, cardBelowId) {
  return {
    type: actions.UPDATE_CARD_POSITION,
    payload: {
      hoverCardId,
      cardBelowId,
    }
  };
}

export function updateFilterValue(filterValue) {
  return {
    type: actions.UPDATE_FILTER_VALUE,
    payload: {
      filterValue
    }
  };
}

export function updateCurrentSearch(jobs) {
  return {
    type: actions.UPDATE_CURRENT_SEARCH,
    payload: {
      jobs
    }
  };
}

export function fetchSavedSearches(savedSearches) {
  return {
    type: actions.FETCH_SAVED_SEARCHES,
    payload: {
      savedSearches
    }
  }
}

export function addCardsToKanban(cards) {
  return {
    type: actions.ADD_CARDS_TO_KANBAN,
    payload: {
      cards
    }
  }
}

export function addEventToCard(event) {
  return {
    type: actions.ADD_EVENT_TO_CARD,
    payload: {
      event
    }
  }
}

export function deleteEventFromCard(event) {
  return {
    type: actions.DELETE_EVENT_FROM_CARD,
    payload: {
      event
    }
  }
}

export function fetchDataVis(searches) {
	function location () {
		var result = [];
		for (var i = 0; i < dataset.length;i++) {
			result.push(dataset[Math.floor(Math.random() * dataset.length)].location)
		}
		return result;
	}

	function totalResults () {
		var result = []
			for (var i = 0; i < dataset.length; i++) {
					result.push(Math.floor((Math.random() * 1000) * 7))
			}
		return result;
	}

	var obj = {
		location: location(),
		totalResults: totalResults(),
		query: searches
	}

  return {
    type: actions.FETCH_DATA_VIS,
    payload: totalResults()
  }
}

export function updateCurrentQuery(currentQuery) {
  return {
    type: actions.UPDATE_CURRENT_QUERY,
    payload: {
      currentQuery
    }
  }
}

export function deleteCardFromKanban(card_id) {
  return {
    type: actions.DELETE_CARD_FROM_KANBAN,
    payload: {
      card_id
    }
  }  
}

export function updateCardNotes(card_id, notes) {
  return {
    type: actions.UPDATE_CARD_NOTES,
    payload: {
      card_id,
      notes
    }
  }
}

export function changeCardRating(card_id, newRating) {
  return {
    type: actions.CHANGE_CARD_RATING,
    payload: {
      card_id,
      newRating
    }
  }
}

export function changeSortingCriteria(sortingCriteria) {
  return {
    type: actions.CHANGE_SORTING_CRITERIA,
    payload: {
      sortingCriteria
    }
  }
}