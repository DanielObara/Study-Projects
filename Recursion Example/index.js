// const dishesToWash = ["plate", "fork", "cup", "knife", "spoon", "bowl", "plate", "fork", "cup", "knife", "spoon", "bowl"];


// const washDishes = (dishes) => {

// 	if (dishes.length === 0) {
// 		return;
// 	}

// 	console.log(`Washing ${dishes[0]}...`);

// 	washDishes(dishes.slice(1));

// 	if (dishes.length === 1) {
// 		console.log("All dishes are washed!");
// 	}
// }

// washDishes(dishesToWash);


const toysToSeparate = [{ name: "car", color: "red" }, { name: "car", color: "green" }, { name: "doll", color: "yellow" }, { name: "doll", color: "green" }, { name: "ball", color: "red" }, { name: "ball", color: "green" }];


const separateToys = (toys, greenToys = [], redToys = [], yellowToys = []) => {

	if (toys.length === 0) {
		return;
	}

	console.log(`Separating ${toys[0].name}...`);

	if (toys[0].color === "green") {
		greenToys.push(toys[0]);
	} else if (toys[0].color === "red") {
		redToys.push(toys[0]);
	} else if (toys[0].color === "yellow") {
		yellowToys.push(toys[0]);
	}

	separateToys(toys.slice(1), greenToys, redToys, yellowToys);

	if (toys.length === 1) {
		console.log("All toys are separated!");
		console.log("Green toys: ", greenToys);
		console.log("Red toys: ", redToys);
		console.log("Yellow toys: ", yellowToys);
	}

}

separateToys(toysToSeparate);