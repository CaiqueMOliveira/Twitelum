import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {

  constructor()
  {
      super();
      // estados dos objetos
      this.state = {
        novoTweet: '',
        tweets: []
    };
  }

/**
 * Adiciona um novo tweet no feed
 */
  addNovoTweet = (event) =>
  {
    //   Remove o refresh da tela
    event.preventDefault()

    this.setState({
        // Add o novo tweet ao array exibido no feed        
        tweets: [this.state.novoTweet, ...this.state.tweets],
        
        // Limpa o campo de mensagem do novo tweet
        novoTweet: ''
    })
  }

  render() {
    return (
      <Fragment>
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
                        {
                            // Exibe cada tweet presente no array contido no state 
                            this.state.tweets.map((tweet, index) => <Tweet key={index} message={tweet}/>)
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
