import './App.css';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import Layout from './components/Layout';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout />}>
        <Route index  element={<Homepage />} />
        <Route path="/cart"  element={<Cart />} />
      </Route>
      </>
    )
  )

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
