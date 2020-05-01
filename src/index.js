import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

















// import { debounce } from "lodash";
//** two types to debounce//

// class Debounce extends React.Component {
//     state = { text: "" };
//     handleChange = debounce((text) => {
//         this.setState({
//             text
//         })
//     },500);
//     componentWillUnmount(){
//         this.handleChange.cancel();
//     }
//     render(){
//         return(
//             <div>
//                 <input onChange={e=> this.handleChange(e.target.value)}/>
//                 <div>
//                     <textarea value={this.state.text}/>
//                 </div>
//             </div>
//         )
//     }
// }                            
// class Debounce extends Component {
//     state = { text: "" };
//     debounceEvent(...args){
//         this.debouncedEvent= debounce(...args);
//         return e =>{
//             e.persist();
//             return this.debouncedEvent(e);
//         }
//     }
//     handleChange = (e) => {
//         this.setState({
//             text:e.target.value
//         })
//     }
//     componentWillUnmount(){
//         this.debouncedEvent.cancel();
//     }
//     render(){
//         return(
//             <div>
//                 <input onChange={this.debounceEvent(this.handleChange,500)}/>
//                 <div>
//                     <textarea value={this.state.text}/>
//                 </div>
//             </div>
//         )
//     }
// }
// class Web extends Component {
//     state = { show: true };
//     handleToggle = () => {
//         this.setState(prevState => ({
//             show: !prevState.show
//         }));
//     };
//     render(){
//         return(
//             <div>
//                 <button onClick={this.handleToggle}>Debounce</button>
//                 {this.state.show ? <Debounce/> : null}
//             </div>
//         )
//     }
// }

