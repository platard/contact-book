<template>
	<div class="container">
		<h1>Add New Contact</h1>
		<div class="nav">
			<router-link to="/"><button class="home">Home</button></router-link>
		</div>
		<div class="form-card">
			<form @submit.prevent="addContact">
				<div>
					<label for="fName">First name:</label>
					<input
						type="text"
						id="fName"
						v-model="newContact.fName"
						required />
				</div>
				<div>
					<label for="lName">Last name:</label>
					<input
						type="text"
						id="lName"
						v-model="newContact.lName"
						required />
				</div>
				<div>
					<label for="number">Phone number:</label>
					<input
						type="tel"
						id="number"
						v-model="newContact.number"
						required />
				</div>
				<div>
					<label for="email">Email:</label>
					<input
						type="email"
						id="email"
						v-model="newContact.email"
						required />
				</div>
				<div class="justify-center">
					<button type="submit">ADD CONTACT</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { contacts as dbContacts } from '../db';

	export default {
		data: function () {
			return {
				contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
				newContact: {
					id: '',
					fName: '',
					lName: '',
					number: '',
					email: '',
				},
			};
		},
		methods: {
			addContact() {
				const maxIdFromLocalStorage = this.contacts.reduce(
					(maxId, contact) => {
						return Math.max(maxId, contact.id);
					},
					0,
				);

				this.newContact.id = maxIdFromLocalStorage + 1;

				this.contacts.push(this.newContact);
				this.saveContactsToLocalStorage();
				const newContactId = this.newContact.id;
				this.newContact = {
					id: '',
					fName: '',
					lName: '',
					number: '',
					email: '',
				};
				this.$router.push({
					name: 'ContactDetails',
					params: { id: newContactId },
				});

			},
			saveContactsToLocalStorage() {
				localStorage.setItem('contacts', JSON.stringify(this.contacts));
			},
		},
		created() {
			const storedContacts = JSON.parse(
				localStorage.getItem('contacts') || '[]',
			);
			if (storedContacts.length === 0) {
				localStorage.setItem('contacts', JSON.stringify(dbContacts));
			}
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
