<template>
	<div class="container">
		<h1>Contact Book</h1>
		<div class="nav">
			<input
				type="text"
				v-model="searchQuery"
				placeholder="Search contacts..." />
			<router-link to="/add-contact"
				><button>+ ADD NEW CONTACT</button></router-link
			>
		</div>
		<div>
			<ul>
				<li
					v-for="contact in filteredContacts"
					:key="contact.id"
					class="list-item">
					<router-link
						:to="{
							name: 'ContactDetails',
							params: { id: contact.id },
						}">
						<strong>{{ contact.fName }} {{ contact.lName }}</strong>
					</router-link>

					<div class="list-btns">
						<div>
							<router-link
								:to="{
									name: 'EditContact',
									params: { id: contact.id },
								}">
								<button class="edit">Edit</button>
							</router-link>
						</div>
						<div>
							<button @click="deleteContact(contact.id)" class="delete">
								Delete
							</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { contacts as dbContacts } from '../db';

	export default {
		data() {
			return {
				contacts: [],
				searchQuery: '',
			};
		},
		computed: {
			sortedContacts() {
				return this.contacts.sort((a, b) => {
					const nameA = a.lName.toLowerCase();
					const nameB = b.lName.toLowerCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
			},
			filteredContacts() {
				return this.sortedContacts.filter((contact) => {
					const fullName =
						`${contact.fName} ${contact.lName}`.toLowerCase();
					return fullName.includes(this.searchQuery.toLowerCase());
				});
			},
		},
		methods: {
			fetchContactsFromLocalStorage() {
				const localStorageContacts = JSON.parse(
					localStorage.getItem('contacts') || '[]',
				);
				const newContacts = dbContacts.filter(
					(contact) =>
						!localStorageContacts.some((c) => c.id === contact.id),
				);
				this.contacts = [...localStorageContacts, ...newContacts];
				console.log('Fetched contacts:', this.contacts);
			},
			deleteContact(contactId) {
				this.contacts = this.contacts.filter(
					(contact) => contact.id !== contactId,
				);
				localStorage.setItem('contacts', JSON.stringify(this.contacts));
			},
		},
		watch: {
			contacts: {
				handler(newContacts) {
					console.log('Updating contacts:', newContacts);
					localStorage.setItem(
						'contacts',
						JSON.stringify(newContacts),
					);
				},
				deep: true,
			},
		},
		created() {
			this.fetchContactsFromLocalStorage();
		},
	};
</script>


<style scoped>
  /* Global font style */
  * {
    font-family: system-ui;
  }

  /* Center the main title and set its color */
  h1 {
    text-align: center;
    color: #F5F5F5;
  }

  /* Style for the list of contacts */
  ul {
    list-style-type: none;
    padding: 0;
  }

  /* Style for each contact item */
  li {
    padding: 10px;
    background-color: antiquewhite;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Style for links */
  a {
    cursor: pointer;
    text-decoration: none;
    color: #333333;
  }

  /* Hover effect for links */
  a:hover {
    color: #333;
  }

  /* Style for the search input */
  input {
    width: 100%;
    max-width: 32ch;
    height: 32px;
  }

  /* General button styling */
  button {
    cursor: pointer;
    background-color: #666666;
    color: white;
    font-size: 0.875rem;
    border: none;
    padding: 10px 15px;
  }

  /* Specific styles for edit and delete buttons */
  .edit {
    background-color: #ffc107;
  }

  .delete {
    background-color: #dc3545;
  }

  /* Hover effect for buttons */
  button:hover {
    background-color: #333333;
  }

  /* Style for the navigation bar */
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  /* Style for the container */
  .container {
    max-width: 56em;
    margin: auto;
  }

  .list-btns{
	display: flex;
  }
</style>
