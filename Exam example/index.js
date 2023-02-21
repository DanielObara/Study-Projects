const prompt = require('prompt-sync')();
const questions = [
	{
		question: "What is the capital of India?",
		options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
		answer: "Delhi"
	},
	{
		question: "What is the capital of Pakistan?",
		options: ["Islamabad", "Karachi", "Lahore", "Peshawar"],
		answer: "Islamabad"
	},
	{
		question: "What is the capital of Bangladesh?",
		options: ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],
		answer: "Dhaka"
	},
	{
		question: "What is the capital of Nepal?",
		options: ["Kathmandu", "Pokhara", "Biratnagar", "Lalitpur"],
		answer: "Kathmandu"
	},
	{
		question: "What is the capital of Bhutan?",
		options: ["Thimphu", "Paro", "Punakha", "Phuntsholing"],
		answer: "Thimphu"
	},
	{
		question: "What is the capital of Sri Lanka?",
		options: ["Colombo", "Kandy", "Galle", "Jaffna"],
		answer: "Colombo"
	},
	{
		question: "What is the capital of Brazil?",
		options: ["Brasilia", "Rio de Janeiro", "Sao Paulo", "Salvador"],
		answer: "Brasilia"
	},
	{
		question: "What is the capital of Argentina?",
		options: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"],
		answer: "Buenos Aires"
	},
	{
		question: "What is the capital of Chile?",
		options: ["Santiago", "Valparaiso", "Concepcion", "Antofagasta"],
		answer: "Santiago"
	},
	{
		question: "What is the capital of Peru?",
		options: ["Lima", "Arequipa", "Trujillo", "Chiclayo"],
		answer: "Lima"
	}
]

function startProgram(questionsSample, currentChance = 1, scores = []) {
	// Start the program
	const maxChance = 3;
	const currentQuestions = Array.from(questionsSample);
	let score = 0;
	const optionLetters = ["A", "B", "C", "D"];
	if (currentChance <= maxChance) {
		console.log("Current chance: ", currentChance);

		for (let index = 0; index < questionsSample.length; index++) {
			let randomIndex = Math.floor(Math.random() * currentQuestions.length);

			let currentQuestion = currentQuestions[randomIndex];
			let userAnswer = prompt(currentQuestion.question + "\n" + formatQuestionOptions(currentQuestion.options, optionLetters) + "\nAnswer: ");

			userAnswer = formattedAnswer(userAnswer)
			const indexOfAnswer = optionLetters.indexOf(userAnswer)

			score = calculateScore(currentQuestion, indexOfAnswer, score);

			//Remove the question from the current questions
			currentQuestions.splice(randomIndex, 1);
		}
		currentChance++;
		showExamOverview(score, questionsSample);
		scores.push(score);
		shouldRestarExam(questionsSample, currentChance, scores);
	} else {
		exceededMaxChance(scores);
	}

}

function exceededMaxChance(scores) {
	console.log('You have exceeded the maximum chance');
	console.log('Your current score is: ', getMaximumScore(scores));
	console.log('Thank you for taking the exam');
}

function getMaximumScore(scores) {
	// Get the maximum score
	return Math.max(...scores);
}

function calculateScore(currentQuestion, indexOfAnswer, score) {
	const isCorrectAnswer = currentQuestion.options[indexOfAnswer] === currentQuestion.answer;
	isCorrectAnswer ? score++ : score;
	return score;
}

function shouldRestarExam(questionsSample, currentChance, scores) {
	const tryAgain = prompt("Do you want to try again? (Y/N)").toUpperCase();
	if (tryAgain === "Y")
		startProgram(questionsSample, currentChance, scores);
}

function showExamOverview(score, questionsSample) {
	score >= 6 ? console.log("You passed the exam") : console.log("You failed the exam");
	console.log("Your score is: ", score);
	console.log(`Your percentage is: ${(score / questionsSample.length) * 100}%`);
}

function formatQuestionOptions(options, optionLetters = ["A", "B", "C", "D"]) {
	// Format the questions options
	let sortedOptions = options.sort();
	return sortedOptions.map((option, index) =>
		`${optionLetters[index]}. ${option}`
	).toString().split(",").join("\n");
}

function formattedAnswer(answer) {
	// Format the answer remove the dot and make it uppercase
	const formatted = answer.substring(0, 1).toUpperCase();
	return formatted;
}



startProgram(questions);