export const carregaTweets = function() {
    return (dispatch) => {
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
            .then((respostaVindoDoServidor) => {
                return respostaVindoDoServidor.json()
            })
            .then((tweetsVindoDoServidor) => {
                // Despacho dos tweets na Store
                dispatch({type: 'CARREGA_TWEETS', tweets: tweetsVindoDoServidor})
            })
    }
}

export const adicionarTweet = function(novoTweet) {
    return (dispatch) => {
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({conteudo: novoTweet})
            })
            .then((respostaDoServer) => {
                if(respostaDoServer.status === 201)
                {
                    return respostaDoServer.json()
                }else{
                    throw new Error('Falha ao criar o novo tweet :(')
                }
            })
            .then((tweetDoServer) => {
                console.log(tweetDoServer)
                dispatch({type:'ADICIONA_TWEET', novoTweetLindinho: tweetDoServer})
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const removeTweet = function(idDoTweetQueVaiSumir) {
    return function(dispatch){
        dispatch({type: 'REMOVE_TWEET', idDoTweetQueVaiSumir: idDoTweetQueVaiSumir})
        fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweetQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,{
              method: 'DELETE'
          })
          .then((respostaDoServer) => respostaDoServer.json())
          .then((respostaEmObjeto) => {
              // Despacho dos tweets na Store
              dispatch({type:"SHOW_NOTIFICACAO", texto:'Tweet removido com sucesso!'})
          })
    }
}