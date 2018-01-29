import React, { Component, Fragment } from 'react';
import './QuoteMachine.css';

class QuoteMachine extends Component {

    constructor() {
        super();
        this.state = {
            currentQuote: {
                quote: '',
                author: ''
            },
            hasQuote: false
        }
        this.END_POINT = 'https://talaikis.com/api/quotes/random/'
    }

    componentDidMount() {
        this.getRandomQuote();
    }

    getRandomQuote = event => {
        fetch(this.END_POINT)
            .then(response => response.json())
            .then(data => {
               if(data.quote && data.author) {
                   let { currentQuote } = this.state;
                   currentQuote.quote = data.quote;
                   currentQuote.author = data.author;
                   this.setState({ currentQuote }, () => {
                       if(this.state.hasQuote === false) {
                           this.setState({ hasQuote: true })
                       }
                   })
               }
               else {
                   return console.error('404 No quotes found!')
               }
            })
    }

    renderQuote = () => {
        const { author, quote } = this.state.currentQuote;
        return (
            <div>
                <p>{quote}</p>
                <p>{author}</p>
            </div>
        )
    }

    tweet = () => {
        const thisQuote = this.state.currentQuote.quote;
        const thisAuthor = this.state.currentQuote.author;
        return (
            <a href={`https://twitter.com/intent/tweet?text="${thisQuote}" ~${thisAuthor}

            https://syknapse.github.io/Syk-Houdeib/ random quote by @Syknapse`} // Modify url and text
                target="_blank">
                <button>twitter</button>
            </a>
        )
    }

    render(){
        const { hasQuote } = this.state;
        return (
            <Fragment>
                <h1>Quote Machine</h1>
                <button onClick={this.getRandomQuote}>
                    Get A Random Quote!!
                </button>
                <br />
                {hasQuote === true ?
                    this.renderQuote()
                    : '⏳'}
                {this.tweet()}
            </Fragment>
        )
    }
}

export default QuoteMachine;