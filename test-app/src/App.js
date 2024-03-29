import './App.css';
import React from 'react';

import ReactMarkdown from 'react-markdown'
import markdownFile from './markdown.md'
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, dark, prism, atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python"

SyntaxHighlighter.registerLanguage("python", python);

function Header(){
  return (
    <header >
      <h1 className="App-header text-4xl p-4 text-center">
        Andrew Beaven
      </h1>
      <h2 className='text-center'>
        Subtitle
       </h2>
    </header>
  )
}

function Footer(){
  return(
    <footer class='App-footer p-2 text-center'>
      &#169; Andrew Beaven 2024
    </footer>
  )
}

class Article extends React.Component{
  
  state = {
    markdown: null,
  };

  componentWillMount() {
    fetch(markdownFile)
    .then((response) => response.text())
    .then((text) => {
      this.setState({ markdown: text })
    })
  }

  render(){
    return(
    <article className='Article ml-4 col-span-2 font-sans leading-loose prose prose-invert prose-lg max-w-none'>
      {/* <ReactMarkdown children={this.state.markdown} className={'prose max-w-none'}/> */}
      <ReactMarkdown
      components={{
        code({ inline, className, ...props }) {
          const hasLang = /language-(\w+)/.exec(className || "");
          return !inline && hasLang ? (
            <SyntaxHighlighter
              style={atomDark}
              language={hasLang[1]}
              PreTag="div"
              className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
              showLineNumbers={true}
              useInlineStyles={true}
            >
              {String(props.children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props} />
          );
        },
      }}
    >
      {this.state.markdown}
    </ReactMarkdown>
    </article>
  )
    }
}

let topics = ['Inroduction','topic-1', 'topic-2', 'topic-3']
function NavigationPanel(){

  var items = [];
  for (let i = 0; i < topics.length; i ++){
    items.push(<li>{topics[i]}</li>);
  }

  return(
    <div className='NavigationPanel'>
      <div className='outline m-4 rounded-md max-h-max p-4'>
        <h3 className='underline text-lg'>Topics</h3>
        <ul className='list-disc pl-4'>
          {items}
        </ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App bg-slate-800 text-slate-50">
      <Header/>
      <div id='content-container' className='p-8 grid grid-cols-3 gap-5'>
        <Article/>
        <NavigationPanel/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
