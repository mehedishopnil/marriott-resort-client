import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import Contact from "../../pages/Contact/Contact";
import Profile from "../../pages/Profile/Profile";
import IndividualEarnings from "../../pages/IndividualEarnings/IndividualEarnings";
import Reservations from "../../pages/Reservations/Reservations";
import HostingDashboard from "../../layout/HostingDashboard/HostingDashboard";
import Earnings from "../../pages/Earnings/Earnings";
import Insights from "../../pages/Insights/Insights";
import GuideBooks from "../../pages/GuideBooks/GuideBooks";
import CreateNewList from "../../pages/CreateNewList/CreateNewList";
import Listings from "../../pages/Listings/Listings";
import PrivateRout from "../PrivateRoute";
import Resorts from "../../pages/Resorts/Resorts";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path: 'registration',
                element: <Registration/>
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'resorts',
                element: <Resorts/>
            },
            {
               path: 'individual-earnings/:id',
              element: <IndividualEarnings/>
            }
        ]
    },

    {
        path: '/hosting-dashboard',
        element: <PrivateRout><HostingDashboard></HostingDashboard></PrivateRout>,
        children: [
            {
                path:'reservation',
                element: <Reservations></Reservations>

            },
           
            {
                path: 'earnings',
                element: <Earnings></Earnings>
            },
            {
                path: 'insights',
                element: <Insights></Insights>
            },
            {
                path: 'guide-books',
                element: <GuideBooks></GuideBooks>
            },
            {
                path: 'create-new-list',
                element: <CreateNewList></CreateNewList>
            },
            {
                path: 'listings',
                element: <Listings></Listings>
            },
            {
                path: 'individual-earnings/:id',
                element: <IndividualEarnings></IndividualEarnings>
            },
            
        ]
    }


    
])