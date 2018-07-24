import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    fazerLogin = (event) => {
        event.preventDefault()

        const dadosLogin = {
            login: this.inputLogin.value,
            senha: this.inputSenha.value,
        }

        fetch('http://twitelum-api.herokuapp.com/login',{
            method:'POST',
            body: JSON.stringify(dadosLogin)   
        })
        // Obtem a response do endpoint
        .then((res) => {
            if(res.status === 200) {
                return res.json()
            }
            throw new Error('Deu Ruim!');
        })
        .then((jsonRes) => {
            // Armazena o token no local storage
            localStorage.setItem('token', jsonRes.token)
            // Armazena o nome no local storage
            localStorage.setItem('login', dadosLogin.login)
            this.props.history.push('/')            
        })
        .catch((error) => {
            alert(error)
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.fazerLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input ref={(inputLogin => this.inputLogin = inputLogin)} className="loginPage__input" type="text" id="login" name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input ref={(inputSenha) => this.inputSenha = inputSenha} className="loginPage__input" type="password" id="senha" name="senha"/>
                            </div>
                            {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage