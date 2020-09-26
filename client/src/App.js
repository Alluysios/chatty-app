import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Chat from './screens/Chat/Chat.Component';
import Join from './screens/Join/Join.Component';

const App = () => {
    return (
        <Router>
            <Route path='/' exact component={Join} />
            <Route path='/chat' exact component={Chat} />
        </Router>
    )
}

export default App
