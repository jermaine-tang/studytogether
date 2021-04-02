import Homepage from './components/Homepage.vue';
import Loginpage from './components/Loginpage.vue';
import Listings from './components/Listings.vue';
import SignupPage from './components/SignupPage.vue';
import IndividualListings from './components/IndividualListings.vue';
import Bookings from './components/Bookings.vue';
import Reviews from './components/Reviews.vue';
import Favourites from './components/Favourites.vue';

export default[
    {path: '/', component: Homepage},
    {path: '/listings', name: 'listings', component: Listings},
    {path: '/login', component: Loginpage},
    {path: '/signup', component: SignupPage},
    {path: '/indiv', component: IndividualListings, props: true},
    {path: '/bookings', component: Bookings},
    {path: '/reviews', component: Reviews},
    {path: '/favourites', name: "favourites", component: Favourites},
]