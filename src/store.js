import {createStore} from 'redux'

// Reducer do store
function tweetsReducer(stateDaStore = [], action){
    if(action.type === "CARREGA_TWEETS"){
        return [
            ...action.tweets
        ]
    }

    return stateDaStore
}

// Criando o store
window.store = createStore(tweetsReducer)

