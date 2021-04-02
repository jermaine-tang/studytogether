<template>
	<div id="review">
		<app-header></app-header>

		<div id="all">
			<div id="details">
				<!-- <h1>Write a Review</h1> -->
				<span id="name">{{ listingDetail["name"] }}</span>
				<img
					:src="listingDetail['photoURL1']"
					alt="listing-pic"
					id="main-pic"
				/>
			</div>
			<div class="container">
				<h1 id="intro">Write Your Review</h1>
				<div id="form">
					<form>
						<!-- title -->
						<div class="row">
							<div class="col-25">
								<label for="title" id="fields">Your Title</label>
							</div>
							<div class="col-75">
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Your title..."
									v-model="title"
									required
								/>
							</div>
						</div>
						<!-- noise -->
						<div class="row">
							<div class="col-25">
								<label for="noise" id="fields">Noise</label>
							</div>
							<div class="col-75">
								<select
									id="noiseOptions"
									name="noiseOptions"
									v-model="noise"
									required
								>
									<option value="quiet">1 - Quiet</option>
									<option value="tolerable">2 - Tolerable</option>
									<option value="whiteNoise">3 - Perfect</option>
								</select>
							</div>
						</div>
						<!-- rating -->
						<div class="row">
							<div class="col-25">
								<label for="rating" id="fields">Rating</label>
							</div>
							<div class="col-75">
								<select id="rating" name="rating" v-model="rating" required>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</div>
						</div>
						<!-- review -->
						<div class="row">
							<div class="col-25">
								<label for="review" id="fields">Your Review</label>
							</div>
							<div class="col-75">
								<textarea
									id="review"
									name="review"
									placeholder="Write something..."
									style="height:200px"
									v-model="comment"
									required
								></textarea>
							</div>
						</div>
						<!-- send button -->
						<br />
						<div id="send">
							<div class="row">
								<input
									type="submit"
									value="submit"
									v-on:click="
										send();
										route();
									"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- old code -->

		<!-- <h1>Write a Review</h1>
		<h3>Thank you !</h3>
        <span id="name">{{ listingDetail["name"] }}</span>
		<img :src="listingDetail['photoURL2']" alt="listing-pic" id="main-pic" />
		<br /><br />
		<br /><br />
		<form id="feedback">
			<label for="title"> Title: </label>
			<input
				type="text"
				style="background-color:#DCDCDC"
				v-model="title"
				required
			/>
			<br /><br />
			<label for="reviewText" id="reviewLabel">Review: </label>
			<textarea
				name="reviewText"
				id="reviewText"
				cols="30"
				rows="10"
				style="background-color:#DCDCDC"
				v-model="comment"
				required
			>
			</textarea>
		</form>

		<br /><br />
		<label for="noise" id="noise">Noise:</label>
		<span></span>
		<select id="noiseOptions" name="noiseOptions" v-model="noise" required>
			<option value="quiet">1 - Quiet</option>
			<option value="tolerable">2 - Tolerable</option>
			<option value="whiteNoise">3 - Perfect</option>
		</select>
		<br /><br />
		<label for="rating" id="rating">Rating:</label>
		<select id="rating" name="rating" v-model="rating" required>
			<option value="veryPoor">1</option>
			<option value="poor">2</option>
			<option value="average">3</option>
			<option value="good">4</option>
			<option value="excellent">5</option>
		</select>

		<br /><br /><br />
		<button
			type="submit"
			v-on:click="
				send();
				route();
			"
		>
			Send !
		</button>
		<br /><br /><br /> -->

		<!-- <label for="rating">Rating:</label>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/> -->
	</div>
</template>

<script>
import Header from "./UI/Header.vue";
import database from "../firebase.js";
import firebase from "firebase";

export default {
	data() {
		return {
			listingDetail: {},
			title: "",
			comment: "",
			noise: "",
			rating: "",
		};
	},

	components: {
		"app-header": Header,
	},

	methods: {
		fetchItems: function() {
			// var toAdd = {}
            // alert(this.$route.params.id)
			database
				.collection("listings")
				.doc(this.$route.params.id)
				.get()
				.then((snapshot) => {
					var toAdd = snapshot.data();
					this.listingDetail = toAdd;
					// console.log(toAdd);
					// console.log(this.listingDetail);
				});
			// this.listingDetail = data
		},

		send: async function() {
			const locationId = this.$route.params.id;
			console.log(locationId);
			alert(locationId);
			const userId = firebase.auth().currentUser.uid;
			console.log(userId);
			async function retrieveUser(idOfUser) {
				var username = "";
				await database
					.collection("users")
					.doc(idOfUser)
					.get()
					.then((doc) => {
						let data = doc.data();
						username = data["name"];
					});
				return username;
			}
			let username = await retrieveUser(userId);
			database
				.collection("listings")
				.doc(locationId)
				.collection("reviews")
				.add({
					title: this.title,
					comments: this.comment,
					noise: this.noise,
					rating: this.rating,
					userid: userId,
					user: username,
				});
		},

		route: function() {
			this.$router.push({ path: "/bookings" });
		},
	},

	created: function() {
		this.fetchItems();
	},
};
</script>

<style scoped>
#all {
	display: flex;
	flex-wrap: wrap;
	background-color: #ffe5b4;
	/* width: 2000px; */
	height: 800px;
}

#main-pic {
	position: relative;
	right: 80px;
	height: 510px;
	width: 510px;
	left: 40px;
	/* bottom: 10px; */
	top: 180px;
	border-radius: 30px;
}

#name {
	position: relative;
	bottom: 400px;
	/* top: 50px; */
	left: 410px;
	font-size: 40px;
}

#reviewLabel {
	position: relative;
	bottom: 150px;
}

#fields {
	font-size: 16px;
}

/* #details {
	position: relative;
    top: 20%;
    background-size: 100px;

} */

#send {
	position: relative;
	right: 25%;
}

#form {
	position: relative;
	/* left: 3px; */
	right: 16%;
	top: 100px;
}

#intro {
	/* justify-content: flex-end; */
	/* justify-content: center; */
	position: relative;
	left: 24%;
	font-size: 18px;
	/* height: inherit; */
}

/* START OF IMPORTED CSS FOR OVERALL PAGE*/

* {
	box-sizing: border-box;
	font-size: 16px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}

input[type="text"],
select,
textarea {
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	resize: vertical;
}

label {
	padding: 12px 12px 12px 0;
	display: inline-block;
}

input[type="submit"] {
	background-color: #4caf50;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	float: right;
}

input[type="submit"]:hover {
	background-color: #45a049;
}

.container {
	position: absolute;
	display: flex;
	flex-wrap: wrap;
	width: 800px;
	height: 600px;
	margin-left: 52%;
	margin-top: 5%;
	border-radius: 7px;
	background-color: #ffcba4;
	padding: 20px;
	justify-content: center;
}

.col-25 {
	float: left;
	width: 25%;
	margin-top: 6px;
}

.col-75 {
	float: left;
	width: 75%;
	margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
	.col-25,
	.col-75,
	input[type="submit"] {
		width: 100%;
		margin-top: 0;
	}
}
</style>
