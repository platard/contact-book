// import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

// views
import ContactList from './views/ContactList.vue';
import ContactDetails from './views/ContactDetails.vue';
import ContactForm from './views/ContactForm.vue';
import EditContact from './views/EditContact.vue';

const routes = [
	{
		path: '/',
		component: ContactList,
		name: 'ContactList',
		props: true,
	},
	{
		path: '/contact/:id',
		component: ContactDetails,
		name: 'ContactDetails',
		props: true,
	},
	{
		path: '/add-contact',
		name: 'AddContact',
		component: ContactForm,
	},
	{
		path: '/edit-contact/:id',
		name: 'EditContact',
		component: EditContact,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

createApp(App).use(router).mount('#app');
