{
    const tasks = [
        {
            content: "zrobić zadanie domowe",
            done: false,
        },
        {
            content: "zrobić zakupy",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);

        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;

        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item">
            <button class="tasks__button tasks__button--done js-done">${task.done ? "✔" : ""}</button>
            <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">${task.content}</span>
            <button class="tasks__button js-delete">🗑</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const deleteButtons = document.querySelectorAll(".js-delete");
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            addNewTask(newTaskContent);
    };


    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}