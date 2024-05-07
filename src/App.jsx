import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from './Pages/AppLayout';
import { Suspense, lazy } from "react";

// import Login from "./Pages/Login";
import Citylist from "./components/Citylist";
import CountriesList from './components/CountriesList';
import City from "./components/City";
import { CitiesProvider } from "./Context/CitiesContext";
import Form from "./components/Form";
import { AuthProvider } from "./Context/FakeAuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage';
const Homepage = lazy(() => import('./Pages/Homepage'))
const AppLayout = lazy(() => import('./Pages/AppLayout'))
const Product = lazy(() => import('./Pages/Product'))
const Pricing = lazy(() => import('./Pages/Pricing'))
const PageNotFound = lazy(() => import('./Pages/PageNotFound'))
const Login = lazy(() => import('./Pages/Login'))






// the url is realy good place to store the state and espicially ui state





export default function App() {


  return (
    // define our routes in a declaritive way
    <AuthProvider>
      <CitiesProvider>
        <div>


          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>

                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="app" element={<ProtectedRoute>
                  <AppLayout />


                </ProtectedRoute>} >


                  <Route index element={<Navigate replace to={'cities'} />} />
                  <Route path="cities" element={<Citylist />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountriesList />} />
                  <Route path="form" element={<Form />} />

                </Route>



                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />


              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </CitiesProvider>
    </AuthProvider >
  );
}
