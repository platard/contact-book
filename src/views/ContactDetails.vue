<template>
	<div class="container">
		<h1>Contact Details</h1>
		<div class="nav">
			<router-link to="/"><button>HOME</button></router-link>
		</div>
		<div class="contact-card">
			<p><em>first name:</em> <strong>{{ selectedContact.fName }}</strong></p>
			<p><em>last name:</em> <strong>{{ selectedContact.lName }}</strong></p>
			<p><em>tel:</em> <strong>{{ selectedContact.number }}</strong></p>
			<p><em>email:</em> <strong>{{ selectedContact.email }}</strong></p>
		</div>
	</div>
</template>

<script>
	import { contacts as dbContacts } from '../db';

	export default {
		data() {
			return {
				selectedContact: null,
			};
		},
		created() {
			this.fetchContactDetails();
		},
		methods: {
			fetchContactDetails() {
				const contactId = parseInt(this.$route.params.id);
				const allContacts = [...this.contacts, ...dbContacts];
				this.selectedContact = allContacts.find(
					(contact) => contact.id === contactId,
				);
			},
		},
		computed: {
			contacts() {
				return JSON.parse(localStorage.getItem('contacts') || '[]');
			},
		},
	};
</script>

<style scoped>
	* {
		font-family: system-ui;
	}

	h1 {
		text-align: center;
	}

	a {
		cursor: pointer;
		text-decoration: none;
		color: #0047ab;
	}

	a:hover {
		color: #333;
	}
	.contact-card {
		padding: 15px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		max-width: 300px;
		margin: 0 auto;
	}

	.contact-card h2 {
		margin-top: 0;
		font-size: 1.5rem;
		color: #333;
	}

	.contact-card p {
		margin: 8px 0;
	}

	.container {
		max-width: 56em;
		margin-inline: auto;
	}

	.nav {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	button {
		cursor: pointer;
		background-color: #28a745;
		color: white;
		font-size: 0.875rem;
		border: none;
		padding: 10px 15px;
	}

	button:hover {
		background-color: #333333;
	}
</style>
