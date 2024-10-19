import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import SpotShow  from './components/SpotShow'
import {CreateSpotForm} from './components/SpotForm'
import * as sessionActions from './store/session';
import ManageSpotPage from './components/ManageSpotPage';
import UpdateSpotForm from './components/UpdateSpotForm';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path:'spots/:spotId',
        element: <SpotShow />
      },
      {
        path: '/spots/current',
        element: <ManageSpotPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;