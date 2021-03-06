import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/">
          <BurgerBuilder />
        </Route>
        <Route path="/checkout" >
          <Checkout />
        </Route>
        <Route path="/auth" >
          <Auth />
        </Route>
        <Route path="/orders" >
          <Orders />
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
