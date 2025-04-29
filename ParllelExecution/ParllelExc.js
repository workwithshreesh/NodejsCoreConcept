
async function task1(){

    console.log("Task 1 is started...");
    await new Promise((resolve, reject) => {
        resolve("Task 1 is runing");
    } );

    return "Task 1 is completed"
}


async function task2(){
    console.log("Task 2 is started...");
    await new Promise((resolve, reject) => {
        resolve("Taskk 2 is running");
    });

    return "Task 2 is completed"
}


async function runParllel(){
    console.time("Parllel Task")

    const [ result1, result2] = await Promise.all([task1(), task2()]);

    console.log(result1);
    console.log(result2);

    console.timeEnd("Parllel Task")

}

runParllel()