<template>
	<div class="container">
		<h1>Edit Contact</h1>
		<div class="nav">
			<router-link to="/"><button class="home">Home</button></router-link>
		</div>
		<div class="form-card">
			<form @submit.prevent="updateContact">
				<div>
					<label for="fName">First name:</label>
					<input
						type="text"
						id="fName"
						v-model="editedContact.fName"
						required />
				</div>
				<div>
					<label for="lName">Last name:</label>
					<input
						type="text"
						id="lName"
						v-model="editedContact.lName"
						required />
				</div>
				<div>
					<label for="number">Phone number:</label>
					<input
						type="tel"
						id="number"
						v-model="editedContact.number"
						required />
				</div>
				<div>
					<label for="email">Email:</label>
					<input
						type="email"
						id="email"
						v-model="editedContact.email"
						required />
				</div>
				<div class="justify-center">
					<button type="submit">UPDATE CONTACT</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { contacts as dbContacts } from '../db';

	export default {
		data() {
			return {
				editedContact: null,
			};
		},
		created() {
			this.fetchContactDetails();
		},
		methods: {
			fetchContactDetails() {
				const contactId = parseInt(this.$route.params.id);
				const allContacts = [...this.contacts, ...dbContacts];
				this.editedContact = allContacts.find(
					(contact) => contact.id === contactId,
				);
			},
			updateContact() {
				const contactId = parseInt(this.$route.params.id);
				const contactIndex = this.contacts.findIndex(
					(contact) => contact.id === contactId,
				);

				this.contacts[contactIndex] = { ...this.editedContact };

				localStorage.setItem('contacts', JSON.stringify(this.contacts));

				this.$router.push({
					name: 'ContactDetails',
					params: { id: contactId },
				});
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

	.container {
		max-width: 56em;
		margin-inline: auto;
	}
	.form-card {
		padding: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		max-width: 400px;
		margin: 0 auto;
	}

	.form-card h2 {
		margin-top: 0;
		font-size: 1.5rem;
		color: #333;
	}

	.form-card label {
		font-weight: bold;
	}

	.form-card input {
		width: 95%;
		padding: 8px;
		margin-bottom: 15px;
	}

	.nav {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.justify-center {
		display: flex;
		justify-content: center;
	}

	button {
		cursor: pointer;
		background-color: #28a745;
		color: white;
		font-size: 0.875rem;
		border: none;
		padding: 10px 15px;
	}

	.home{
		background-color: #333333;
	}

	button:hover {
		background-color: #333333;
	}
</style>
