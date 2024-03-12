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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };


    const init = () => {
        render();
    };

    init();
}