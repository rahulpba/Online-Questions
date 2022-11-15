const questions = [
	{
		id: 1,
		question: 'Inside which HTML element do we put the JavaScript?',
		options: [
			{
				option: 'A',
				label: '<js>',
			},
			{
				option: 'B',
				label: '<scripting>',
			},
			{
				option: 'C',
				label: '<script>',
			},
			{
				option: 'D',
				label: '<javascript>',
			},
		],
		answer: 'C',
	},
	{
		id: 2,
		question: '<p id="demo">This is a demonstration.</p>',
		options: [
			{
				option: 'A',
				label: 'document.getElement("p").innerHTML = "Hello World!";',
			},
			{
				option: 'B',
				label: '#demo.innerHTML = "Hello World!";',
			},
			{
				option: 'C',
				label: 'document.getElementByName("p").innerHTML = "Hello World!";',
			},
			{
				option: 'D',
				label: 'document.getElementById("demo").innerHTML = "Hello World!";',
			},
		],
		answer: 'D',
	},
	{
		id: 3,
		question: 'Where is the correct place to insert a JavaScript?',
		options: [
			{
				option: 'A',
				label: 'The <body> section',
			},
			{
				option: 'B',
				label: 'The <head> section;',
			},
			{
				option: 'C',
				label: 'Both the <head> section and the <body> section are correct',
			},
		],
		answer: 'C',
	},
	{
		id: 4,
		question:
			'What is the correct syntax for referring to an external script called "xxx.js"?',
		options: [
			{
				option: 'A',
				label: '<script src="xxx.js">',
			},
			{
				option: 'B',
				label: '<script href="xxx.js">',
			},
			{
				option: 'C',
				label: '<script name="xxx.js">',
			},
		],
		answer: 'A',
	},
	{
		id: 5,
		question: 'The external JavaScript file must contain the <script> tag.',
		options: [
			{
				option: 'A',
				label: 'True',
			},
			{
				option: 'B',
				label: 'False',
			},
		],
		answer: 'A',
	},
	{
		id: 6,
		question: 'How do you write "Hello World" in an alert box?',
		options: [
			{
				option: 'A',
				label: 'alert("Hello World");',
			},
			{
				option: 'B',
				label: 'alertBox("Hello World");',
			},
			{
				option: 'C',
				label: 'msg("Hello World");',
			},
			{
				option: 'D',
				label: 'msgBox("Hello World");',
			},
		],
		answer: 'A',
	},
];

window.onload = (e) => {
	const completeQuestion = () => {
		localStorage.clear();
		window.location = './index.html';
	};

	const startQuestion = () => {
		let lastID = localStorage.getItem('qa_question_id');

		let currentQuestionIndex;
		if (lastID === null) {
			currentQuestionIndex = 0;
		} else {
			lastID = parseInt(lastID);
			currentQuestionIndex =
				questions.findIndex((q) => q.id == lastID) + 1;
		}
		if (currentQuestionIndex >= questions.length) {
			window.location = './result.html';
		} else {
			window.location = './questions.html';
		}
	};

	const nextQuestion = () => {
		let answers = localStorage.getItem('qa_question_answers');
		let lastID = localStorage.getItem('qa_question_id');

		let currentQuestionIndex;
		if (lastID === null) {
			currentQuestionIndex = 0;
		} else {
			lastID = parseInt(lastID);
			currentQuestionIndex =
				questions.findIndex((q) => q.id == lastID) + 1;
		}
		if (currentQuestionIndex < questions.length) {
			const currentQuestion = questions[currentQuestionIndex];

			if (answers === null) {
				answers = {};
			} else {
				answers = JSON.parse(answers);
			}

			const currentAnswerElements = document.querySelectorAll(
				`[name="question_${currentQuestion.id}"]:checked`
			);

			let currentAnswer = [];
			currentAnswerElements.forEach((ans) => {
				currentAnswer.push(ans.value);
			});

			if (currentAnswer.length) {
				if (
					Object.keys(answers).findIndex(
						(a) => a === currentQuestion.id
					) === -1
				) {
					answers[currentQuestion.id] = currentAnswer;
				} else {
					answers[
						Object.keys(answers).findIndex(
							(a) => a === currentQuestion.id
						)
					] = currentAnswer;
				}
				localStorage.setItem('qa_question_id', currentQuestion.id);
				localStorage.setItem(
					'qa_question_answers',
					JSON.stringify(answers)
				);
				fetch();
			}
		} else {
			window.location = './result.html';
		}
	};

	const prevQuestion = () => {
		let lastID = localStorage.getItem('qa_question_id');
		if (lastID === null) {
			window.location = './start.html';
		}
		let currentQuestionIndex =
			questions.findIndex((q) => q.id == lastID) + 1;
		if (currentQuestionIndex === 0) {
			window.location = './start.html';
		}
		const currentQuestion = questions[currentQuestionIndex - 2];
		if (currentQuestionIndex - 1 === 0) {
			localStorage.setItem('qa_question_id', null);
		} else {
			localStorage.setItem('qa_question_id', currentQuestion.id);
		}
		fetch();
	};

	const fetch = () => {
		if (questions?.length) {
			let lastID = localStorage.getItem('qa_question_id');
			let answers = localStorage.getItem('qa_question_answers');
			if (answers === null) {
				answers = {};
			} else {
				answers = JSON.parse(answers);
			}

			let currentQuestionIndex;
			if (lastID === null) {
				currentQuestionIndex = 0;
			} else {
				lastID = parseInt(lastID);
				currentQuestionIndex =
					questions.findIndex((q) => q.id == lastID) + 1;
			}
			if (currentQuestionIndex < questions.length) {
				const currentQuestion = questions[currentQuestionIndex];

				const questionElement =
					document.getElementById('currentQuestion');
				const optionElement = document.getElementById(
					'currentQuestionOptions'
				);
				questionElement.innerHTML = `<span>${
					currentQuestion.id
				}.</span>${escape(currentQuestion.question)}`;

				let optionsHtml = '';
				if (typeof currentQuestion?.answer !== Array) {
					currentQuestion.options.map((opt, i) => {
						optionsHtml += `<li><input type="radio" id="question_${
							currentQuestion.id
						}_${i}" name="question_${currentQuestion.id}" ${
							answers[currentQuestion.id] !== undefined &&
							answers[currentQuestion.id][0] === opt.option
								? 'checked="checked"'
								: ''
						} value="${opt.option}"/><label for="question_${
							currentQuestion.id
						}_${i}" class="radio"></label><label for="question_${
							currentQuestion.id
						}_${i}" ><span>${opt.option}.</span>${escape(
							opt.label
						)}</label></li>`;
					});
				} else {
					currentQuestion.options.map((opt, i) => {
						optionsHtml += `<li><input type="checkbox" id="question_${
							currentQuestion.id
						}_${i}" ${
							answers[currentQuestion.id] !== undefined &&
							answers[currentQuestion.id][0] === opt.option
								? 'checked="checked"'
								: ''
						} name="question_${currentQuestion.id}" value="${
							opt.option
						}"/><label for="question_${
							currentQuestion.id
						}_${i}" class="checkbox"></label><label for="question_${
							currentQuestion.id
						}_${i}" ><span>${opt.option}.</span>${escape(
							opt.label
						)}</label></li>`;
					});
				}
				optionElement.innerHTML = optionsHtml;
			} else {
				window.location = './result.html';
			}
		} else {
			window.location = './index.html';
		}
	};

	const calculatePercentage = (element) => {
		let answers = localStorage.getItem('qa_question_answers');
		answers = JSON.parse(answers);
		const totalQuestions = questions?.length;
		let correct = 0;
		questions?.forEach((question) => {
			if (typeof question?.answer !== Array) {
				if (question?.answer === answers[question.id][0]) {
					correct++;
				}
			} else {
				if (isSameArray(question?.answer, answers[question.id])) {
					correct++;
				}
			}
		});

		const percent = (correct / totalQuestions) * 100;
		element.innerHTML = percent.toFixed(2);
	};

	const isSameArray = (array1, array2) => {
		var is_same =
			array1.length == array2.length &&
			array1.every(function (element, index) {
				return element === array2[index];
			});
		return is_same;
	};

	function escape(htmlStr) {
		return htmlStr
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	// Events

	document.getElementsByClassName('questions_page').length ? fetch() : null;
	const next = document.getElementsByClassName('nextQuestion');
	const prev = document.getElementsByClassName('prevQuestion');

	Array.from(next).forEach(function (element) {
		element.addEventListener('click', nextQuestion);
	});

	Array.from(prev).forEach(function (element) {
		element.addEventListener('click', prevQuestion);
	});

	document.getElementById('question_completed')
		? document
				.getElementById('question_completed')
				.addEventListener('click', completeQuestion)
		: null;
	document.getElementById('start_questions')
		? document
				.getElementById('start_questions')
				.addEventListener('click', startQuestion)
		: null;
	document.getElementById('score_percent')
		? calculatePercentage(document.getElementById('score_percent'))
		: null;
};
