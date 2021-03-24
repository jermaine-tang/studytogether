import Homepage from './components/Homepage.vue';
import Loginpage from './components/Loginpage.vue';
import Listings from './components/Listings.vue';

export default[
    {path: '/', component: Homepage},
    {path: '/listings', component: Listings},
    {path: '/login', component: Loginpage}
    
]