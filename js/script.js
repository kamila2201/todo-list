{
	let tasks = [];

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent },
		];

		render();
	};

	const deleteTask = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex),
			...tasks.slice(taskIndex + 1),
		];

		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);

		render();
	};

	const bindDeleteEvents = () => {
		const deleteButtons = document.querySelectorAll(".js-delete");

		deleteButtons.forEach((deleteButton, taskIndex) => {
			deleteButton.addEventListener("click", () => {
				deleteTask(taskIndex);
			});
		});
	};

	const bindToggleDoneEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(taskIndex);
			});
		});
	}

	const renderTasks = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
              <li class="tasks__item">
                <button class="tasks__button tasks__button--toggleDone js-done">
                  ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                  ${task.content}
                </span>
                <button class="tasks__button tasks__button--delete js-delete">
                  🗑
                </button>
              </li>
            `;
		}

		document.querySelector(".js-tasks").innerHTML = htmlString;
	};

	const renderButtons = () => {
		let hiddenString = "";

		if (tasks.length !== 0) {
			hiddenString += `
              <button class="section__button">Ukryj ukończone</button>
              <button class="section__button">Ukończ wszystkie</button>
            `;
		}

		document.querySelector(".js-buttons").innerHTML = hiddenString;
	};

	const render = () => {
		renderTasks();
		renderButtons();

		bindDeleteEvents();
		bindToggleDoneEvents();

	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskElement = document.querySelector(".js-newTask");
		const newTaskContent = newTaskElement.value.trim();

		if (newTaskContent !== "") {
			addNewTask(newTaskContent);
			newTaskElement.value = "";
		}

		newTaskElement.focus();
	};


	const init = () => {
		render();

		const formElement = document.querySelector(".js-form");
		formElement.addEventListener("submit", onFormSubmit);
	};

	init();
}