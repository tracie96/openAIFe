import './App.css';
import Chat from './component/ChatBox';
import ShopifyLogo from './assets/Shopify-Logo.png';

function App() {
  return (
    <div className="App">
      <img src={ShopifyLogo} alt="Shopify Logo" width={200}/>
      <Chat />
    </div>
  );
}

export default App;
