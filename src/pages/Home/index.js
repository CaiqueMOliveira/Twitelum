import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'
import Helmet from "react-helmet";

class Home extends Component {

  constructor()
  {
      super();
      // estados dos objetos
      this.state = {
        novoTweet: '',
        tweets: [],
        tweetAtivo: {}
    };
  }

//   Fecha a modal do tweet selecionado
  fechaModalHandler = (idDoTweetAtivo) => {
    // Limpa o tweet ativo  
    this.setState({
        tweetAtivo: {}
    })
  }

 //   Obtendo os tweets do server
  componentDidMount() {
      fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
        .then((respostaVindoDoServidor) => {
            return respostaVindoDoServidor.json()
        })
        .then((tweetsVindoDoServidor) => {
            this.setState({
                tweets: tweetsVindoDoServidor
            })
        })
  }

/**
 * Adiciona um novo tweet no feed
 */
  addNovoTweet = (event) =>
  {
    //   Remove o refresh da tela
    event.preventDefault()

    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({conteudo: this.state.novoTweet})
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
        this.setState({
            // Add o novo tweet ao array exibido no feed        
            tweets: [tweetDoServer, ...this.state.tweets],
            
            // Limpa o campo de mensagem do novo tweet
            novoTweet: ''
        })
    })
    .catch((error) => {
        alert(error)
    })
  }

//   Remove o tweet selecionado
  removerTweet = (idDoTweekQueVaiSumir) => {
      fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweekQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,{
          method: 'DELETE'
      })
      .then((respostaDoServer) => respostaDoServer.json())
      .then((respostaEmObjeto) => {
          console.log(respostaEmObjeto)
          const tweetsAtualizados = this.state.tweets.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweekQueVaiSumir
          })
          this.setState({
              tweets: tweetsAtualizados
          })
      })
  }

//   Abre a modal do tweet selecionado
  abreModal = (idDoTweetSelecionado) => {
    const tweetSelecionado = this.state.tweets.find((tweet) => tweet._id === idDoTweetSelecionado)
    this.setState({
        tweetAtivo: tweetSelecionado
    })
  }

  render() {
    return (
      <Fragment>
        <Helmet title={`Twitelum - Home (${this.state.tweets.length})`} />
        <Cabecalho>
            <NavMenu usuario="@caiquemoliveira" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={this.addNovoTweet}>
                        <div className="novoTweet__editorArea">
                            <span className={`novoTweet__status ${this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido' : ''}`}>{this.state.novoTweet.length}/140</span>
                            <textarea required className="novoTweet__editor" placeholder="O que está acontecendo?" 
                                value={this.state.novoTweet} 
                                onChange={(e) => {
                                    this.setState({novoTweet: e.target.value})
                                }}>
                            </textarea>
                        </div>
                        <button type="submit" disabled={this.state.novoTweet.length > 140} className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {Boolean(this.state.tweets.length) || 'Carregando tweets...'}
                        {
                            // Exibe cada tweet presente no array contido no state 
                            this.state.tweets.map((tweet) => <Tweet 
                                                                key={tweet._id} 
                                                                message={tweet.conteudo} 
                                                                likeado={tweet.likeado} 
                                                                removivel={tweet.removivel} 
                                                                removeHandler={this.removerTweet} 
                                                                abreModalHandler={() => this.abreModal(tweet._id)} 
                                                                totalLikes={tweet.totalLikes} 
                                                                usuario={tweet.usuario}
                                                                _id={tweet._id}/>
                                                )
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>
        <Modal 
            fechaModalHandler={this.fechaModalHandler}
            isAberto={Boolean(this.state.tweetAtivo._id)}>
            {
                this.state.tweetAtivo._id && 
                    <Widget>
                        <Tweet
                            _id={this.state.tweetAtivo._id}
                            message={this.state.tweetAtivo.conteudo}
                            usuario={this.state.tweetAtivo.usuario}>
                        </Tweet>
                    </Widget>
            }
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
