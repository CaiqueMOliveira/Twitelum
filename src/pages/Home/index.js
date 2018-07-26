import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import * as TweetsActions from "../../actions/TweetsActions";

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
  fechaModalHandler = (event) => {
    const isModal = event.target.classList.contains('modal')
    if(isModal) {
        // Limpa o tweet ativo  
        this.setState({
            tweetAtivo: {}
        })
    }
  }

//   Permitindo a gravacao das propriedades no context
  static contextTypes =  {
    store: PropTypes.object
  } 

 //   Obtendo os tweets do server
  componentDidMount() {
      this.context.store.subscribe(() =>{
            console.log('Estou inscrito - Home')
            
            // Obtem os tweets do Store
            const tweetsVindoDaStore = this.context.store.getState().tweets

            
            // Altera os estado dos tweets da Home 
            this.setState({
                tweets: tweetsVindoDaStore
            })
        })

        // Executa o dispatch pelo middleware
        this.context.store.dispatch(TweetsActions.carregaTweets())
  }

/**
 * Adiciona um novo tweet no feed
 */
  addNovoTweet = (event) =>
  {
    //   Remove o refresh da tela
    event.preventDefault()
    const novoTweet = this.state.novoTweet
    this.context.store.dispatch(TweetsActions.adicionarTweet(novoTweet))
    this.setState({
        novoTweet: ''
    })
  }

//   Remove o tweet selecionado
//   removerTweet = (idDoTweekQueVaiSumir) => {
//       fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweekQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,{
//           method: 'DELETE'
//       })
//       .then((respostaDoServer) => respostaDoServer.json())
//       .then((respostaEmObjeto) => {
//           console.log(respostaEmObjeto)
//           const tweetsAtualizados = this.state.tweets.filter((tweetAtual) => {
//             return tweetAtual._id !== idDoTweekQueVaiSumir
//           })

//           // Despacho dos tweets na Store
//           this.context.store.dispatch({type: 'CARREGA_TWEETS', tweets: tweetsAtualizados})
//       })
//   }

//   Abre a modal do tweet selecionado
  abreModal = (idDoTweetSelecionado, event) => {
    const isDentroDoTweetFooter = event.target.closest('.tweet__footer')
    
    if(!isDentroDoTweetFooter){
        const tweetSelecionado = this.state.tweets.find((tweet) => tweet._id === idDoTweetSelecionado)
        this.setState({
            tweetAtivo: tweetSelecionado
        })
    }
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
                                                                abreModalHandler={(event) => this.abreModal(tweet._id, event)} 
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
                            usuario={this.state.tweetAtivo.usuario}
                            totalLikes={this.state.tweetAtivo.totalLikes}
                            likeado={this.state.tweetAtivo.likeado}>
                        </Tweet>
                    </Widget>
            }
        </Modal>

        {
            this.context.store.getState().notifications &&
            <div className="notificacaoMsg"
                onAnimationEnd={() => this.context.store.dispatch({type: "LIMPAR_NOTIFICACAO"})}>
                {this.context.store.getState().notifications}
            </div>
        }

      </Fragment>
    );
  }
}

export default Home;
