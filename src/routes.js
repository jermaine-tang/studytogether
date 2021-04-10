import Homepage from './components/Homepage.vue';
import Loginpage from './components/Loginpage.vue';
import Listings from './components/Listings.vue';
import SignupPage from './components/SignupPage.vue';
import IndividualListings from './components/IndividualListings.vue';
import Bookings from './components/Bookings.vue';
import Reviews from './components/Reviews.vue';
import Reservation from './components/Reservation.vue';
import BizBookings from './components/Business/Biz Bookings.vue';

export default[
    {path: '/', component: Homepage},
    {path: '/listings', component: Listings},
    {path: '/listings/:id', name: 'indiv', component: IndividualListings, props:true},
    {path: '/login', component: Loginpage},
    {path: '/signup', component: SignupPage},
    // {path: '/indiv', component: IndividualListings, props: true},
    {path: '/bookings', component: Bookings},
    {path: '/reviews/:id', component: Reviews, props: true},
    {path: '/listings/:id/reserve', name: 'reservation', component: Reservation, props:true},
    {path: '/bizBookings', component: BizBookings}
]