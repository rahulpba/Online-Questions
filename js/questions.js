const questions = [
    {
        id: 1,
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            {
                option: "A",
                label: "<js>",
            },
            {
                option: "B",
                label: "<scripting>",
            },
            {
                option: "C",
                label: "<script>",
            },
            {
                option: "D",
                label: "<javascript>",
            },
        ],
        answer: "C",
    },
    {
        id: 2,
        question: '<p id="demo">This is a demonstration.</p>',
        options: [
            {
                option: "A",
                label: 'document.getElement("p").innerHTML = "Hello World!";',
            },
            {
                option: "B",
                label: '#demo.innerHTML = "Hello World!";',
            },
            {
                option: "C",
                label: 'document.getElementByName("p").innerHTML = "Hello World!";',
            },
            {
                option: "D",
                label: 'document.getElementById("demo").innerHTML = "Hello World!";',
            },
        ],
        answer: "D",
    },
    {
        id: 3,
        question: "Where is the correct place to insert a JavaScript?",
        options: [
            {
                option: "A",
                label: "The <body> section",
            },
            {
                option: "B",
                label: "The <head> section;",
            },
            {
                option: "C",
                label: "Both the <head> section and the <body> section are correct",
            },
        ],
        answer: "C",
    },
    {
        id: 4,
        question:
            'What is the correct syntax for referring to an external script called "xxx.js"?',
        options: [
            {
                option: "A",
                label: '<script src="xxx.js">',
            },
            {
                option: "B",
                label: '<script href="xxx.js">',
            },
            {
                option: "C",
                label: '<script name="xxx.js">',
            },
        ],
        answer: "C",
    },
    {
        id: 5,
        question: "The external JavaScript file must contain the <script> tag.",
        options: [
            {
                option: "A",
                label: "True",
            },
            {
                option: "B",
                label: "False",
            },
        ],
        answer: "C",
    },
    {
        id: 6,
        question: 'How do you write "Hello World" in an alert box?',
        options: [
            {
                option: "A",
                label: 'alert("Hello World");',
            },
            {
                option: "B",
                label: 'alertBox("Hello World");',
            },
            {
                option: "C",
                label: 'msg("Hello World");',
            },
            {
                option: "D",
                label: 'msgBox("Hello World");',
            },
        ],
        answer: "A",
    },
];

window.onload = (e) => {
    if (questions?.length) {
        const lastIndex = localStorage.getItem("qa_question_index");
        let currentQuestion;
        if (lastIndex === null) {
            currentQuestion = questions[0];
        } else {
        }

        const questionElement = document.getElementById("currentQuestion");
        const optionElement = document.getElementById("currentQuestionOptions");
        questionElement.innerHTML = `<span>${currentQuestion.id}.</span>${currentQuestion.question}`;
        let optionsHtml = "";
        if (typeof answer !== Array) {
            currentQuestion.options.map((opt, i) => {
                optionsHtml += `<li><input type="radio" id="question_${
                    currentQuestion.id
                }_${i}" name="question_${currentQuestion.id}" value="${
                    opt.option
                }"/><label for="question_${
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
                }_${i}" name="question_${currentQuestion.id}" value="${
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
        localStorage.setItem("qa_question_index", currentQuestion.id);
    }

    function escape(htmlStr) {
        return htmlStr
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
};
