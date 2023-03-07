const prompt = require('prompt-sync')({ sigint: true });
const questions = require('./questionsMock');

function startProgram(questionsSample, currentChance = 1, scores = []) {
	// Start the program
	const maxChance = 3;
	const currentQuestions = Array.from(questionsSample);
	let score = 0;
	const optionLetters = ["A", "B", "C", "D"];
	if (currentChance <= maxChance) {
		const wrongAnswers = [];
		console.log("Current chance: ", currentChance);

		for (let index = 0; index < questionsSample.length; index++) {
			let randomIndex = Math.floor(Math.random() * currentQuestions.length);

			let currentQuestion = currentQuestions[randomIndex];
			let userAnswer = prompt(currentQuestion.question + "\n" + formatQuestionOptions(currentQuestion.options, optionLetters) + "\nAnswer: ");

			userAnswer = formattedAnswer(userAnswer)
			const indexOfAnswer = optionLetters.indexOf(userAnswer)

			const currentAnswer = currentQuestion.options[indexOfAnswer]

			const isCorrectAnswer = currentAnswer === currentQuestion.answer;

			isCorrectAnswer ? score++ : wrongAnswers.push({ question: currentQuestion.question, answer: currentAnswer });

			//Remove the question from the current questions
			currentQuestions.splice(randomIndex, 1);
		}
		currentChance++;
		showExamOverview(score, questionsSample);
		scores.push(score);
		shouldShowWrongAnswers(wrongAnswers);
		shouldRestarExam(questionsSample, currentChance, scores);
	} else {
		exceededMaxChance(scores);
	}

}

function shouldShowWrongAnswers(wrongAnswers) {
	if (wrongAnswers.length > 0) {
		console.log('Do you want to see the wrong answers? (Y/N)');
		const showWrongAnswers = prompt()?.toUpperCase();
		if (showWrongAnswers === "Y") {
			wrongAnswers.forEach(answer => {
				console.log(`Question: ${answer.question} \nYour Answer: ${answer.answer}`);
			});
		}
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

function shouldRestarExam(questionsSample, currentChance, scores) {
	const tryAgain = prompt("Do you want to try again? (Y/N)")?.toUpperCase();
	if (tryAgain === "Y")
		startProgram(questionsSample, currentChance, scores);
}

function showExamOverview(score, questionsSample) {
	const passScore = 6
	score >= passScore ? console.log("You passed the exam") : console.log("You failed the exam");
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
	const formatted = answer?.substring(0, 1).toUpperCase();
	return formatted;
}



startProgram(questions);