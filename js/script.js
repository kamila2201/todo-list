{
	let tasks = [];
	let hideDoneTasks = false;

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
		tasks = [
			...tasks.slice(0, taskIndex),
			{
				...tasks[taskIndex],
				done: !tasks[taskIndex].done,
			},
			...tasks.slice(taskIndex + 1),
		];

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

	const toggleHideDone = () => {
		hideDoneTasks = !hideDoneTasks;

		render();
	};

	const markAllTasksDone = () => {
		tasks = tasks.map((task) => ({ ...task, done: true }));

		render();
	};

	const bindButtonsEvents = () => {
		const markAllDoneButton = document.querySelector(".js-markAllTasksDone");

		if (markAllDoneButton) {
			markAllDoneButton.addEventListener("click", markAllTasksDone);
		}

		const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

		if (hideDoneTasksButton) {
			hideDoneTasksButton.addEventListener("click", toggleHideDone);
		}

	};

	const renderTasks = () => {
		const taskToHTML = task => `
              <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
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
		

		const tasksElement = document.querySelector(".js-tasks");
		tasksElement.innerHTML = tasks.map(taskToHTML).join("");
	};

	const renderButtons = () => {
		const buttonsElement = document.querySelector(".js-buttons");

		if (!tasks.length) {
			buttonsElement.innerHTML = "";
			return;
		}

		buttonsElement.innerHTML = `
		  <button class="section__button js-hideDoneTasks">
			  ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
		  </button>
		  <button class="section__button js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
			  Ukończ wszystkie
		  </button>
	  `;

	};

	const render = () => {
		renderTasks();
		renderButtons();

		bindButtonsEvents();
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