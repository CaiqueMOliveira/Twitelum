import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'

// Reducer do store
function tweetsReducer(stateDaStore = [], action= {}){
    if(action.type === "CARREGA_TWEETS"){
        return [
            ...action.tweets
        ]
    }

    if(action.type === "ADICIONA_TWEET"){
        return [action.novoTweetLindinho,...stateDaStore]
    }

    if(action.type === "REMOVE_TWEET"){
        const listaDeTweetsAtualizada = stateDaStore.filter((tweetAtual) => {
            return tweetAtual._id !== action.idDoTweetQueVaiSumir
        })

        return listaDeTweetsAtualizada
    }

    return stateDaStore // Tweet
}

function notificationsReducer(state = '', action){
    if(action.type === "SHOW_NOTIFICACAO"){
        return action.texto
    }

    if(action.type === "LIMPAR_NOTIFICACAO")
    {
        return ''
    }

    return state //Notification
}

// Criando o store
export default createStore(
    combineReducers({
        tweets: tweetsReducer,
        notifications: notificationsReducer
    }),
    tweetsReducer,
    applyMiddleware(thunkMiddleware)
)

