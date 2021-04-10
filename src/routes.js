import Homepage from './components/Homepage.vue';
import Loginpage from './components/Loginpage.vue';
import Listings from './components/Listings.vue';
import SignupPage from './components/SignupPage.vue';
import IndividualListings from './components/IndividualListings.vue';
import Bookings from './components/Bookings.vue';
import Reviews from './components/Reviews.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import Favourites from './components/Favourites.vue';
import Reservation from './components/Reservation.vue';
import MyBusiness from './components/Business/MyBusiness.vue';
import BusinessSignup from './components/Business/BusinessSignup.vue';

// import firebase from 'firebase'

export default [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/listings',
        component: Listings
    },
    {
        path: '/listings/:id',
        name: 'indiv',
        component: IndividualListings,
        props: true
    },
    {
        path: '/login',
        component: Loginpage
    },
    {
        path: '/signup',
        component: SignupPage
    },
    // {path: '/indiv', component: IndividualListings, props: true},
    {
        path: '/bookings',
        component: Bookings
    },
    {
        path: '/forgotpassword',
        component: ForgotPassword,
        meta: { auth: 'customer' }
    },
    {
        path: '/favourites',
        name: "favourites",
        component: Favourites,
        meta: { auth: 'customer' }
    },
    {
        path: '/reviews/:id',
        component: Reviews,
        props: true,
        meta: { auth: 'customer' },
    },
    {
        path: '/listings/:id/reserve',
        name: 'reservation',
        component: Reservation,
        props: true,
        meta: { auth: 'customer' },
        // beforeEnter: (to, from, next) => {
        //     firebase.auth().onAuthStateChanged(user => {
        //         if (user) {
        //             next();
        //         } else {
        //             next('/login');
        //         }
        //     })
        // }
    },
    {
        path: '/mybiz',
        name: 'business',
        component: MyBusiness,
        meta: { auth: 'owner' }
    },
    {
        path: '/bizsignup',
        component: BusinessSignup
    }
]