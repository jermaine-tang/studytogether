import Homepage from './components/Homepage.vue';
import Loginpage from './components/Loginpage.vue';
import Listings from './components/Listings.vue';
import IndividualListings from './components/IndividualListings.vue';
import Filter from './components/Filter.vue';

export default[
    {path: '/', component: Homepage},
    {path: '/listings', component: Listings},
    {path: '/login', component: Loginpage},
    {path: '/indiv', component: IndividualListings, props: true},
    { path: '/filter', name: 'filter', component: Filter, props: true },
    
]