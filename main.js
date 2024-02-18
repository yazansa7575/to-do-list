onload = function(){
    red();
    add();
}



//scroll
let arow_GoTop =document.getElementById("GoTop");
arow_GoTop.addEventListener("click",function(){
    scroll({
        top:0,
        behavior:"smooth",
    })
})
//tasks array
let tasks =[
 
]
tasks=JSON.parse(localStorage.getItem("myTasks"));

function red(){
    document.getElementById("tasks").innerHTML = "";
    index= 0;
    for(task of tasks)
    {
        let content = 
        `
            <div class=" ${task.isDone ? "done" : "task" }" id="task">
                <div class="r-sec">
                    <h2>${task.title}</h2>
                    <h4 class="center">
                        <span class="material-symbols-outlined" style="font-size:20px">
                            calendar_month
                        </span>
                        <p>${task.date}</p>
                    </h4>
                </div>
                <div class="l-sec">
                    <button onclick="DeleteTask(${index})" class="btn-cer" style="background-color:red ;">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                    ${task.isDone ? `
                    <button onclick="isDone(${index})" class="btn-cer" style="background-color:#4A008A;">
                        <span class="material-symbols-outlined">
                            cancel
                        </span>
                    </button>
                    
                    ` : `
                    
                    <button onclick="isDone(${index})" class="btn-cer" style="background-color:green;">
                        <span class="material-symbols-outlined">
                            done_all
                        </span>
                    </button>
                    
                    `}
                 
                    <button onclick="update(${index})" class="btn-cer" style="background-color:blue ;">
                        <span class="material-symbols-outlined " >
                            edit
                        </span>
                    </button>
                </div>
            </div>
        `;
        document.getElementById("tasks").innerHTML += content;
        index++;

    }


}

function add(){
    document.getElementById("add-btn").addEventListener('click',function(){

        let titleName = prompt("الرجاء إدخال مهمة جديدة ");
        let Now = new Date();
        let dateNow =  Now.getDate() +"/"+(Now.getMonth()+1)+"/"+Now.getFullYear();
        let NewObj = 
        {
            title:titleName,
            date:dateNow,
            isDone:false,
        }
        
        if (titleName != "")
        {
            tasks.push(NewObj);
            localStorage.setItem("myTasks",JSON.stringify(tasks));
            red();
        }
       
    })
}
function DeleteTask(index){
    let task = tasks[index]; 
    let needDelete = confirm("هل تريد حذف" + " " + task.title );
    if(needDelete)
    {
        tasks.splice(index,1);
        localStorageUpdate()
        red();
    }

}
function update(index){
    let oldTitle = tasks[index];
    let newTitle = prompt(`Enter New Title:`,oldTitle.title);
    let oldDate = tasks[index];
    let Now = new Date();
    let newDate = Now.getDate() +"/"+(Now.getMonth()+1)+"/"+Now.getFullYear();
    if (newTitle ==""){
        oldTitle.title = oldTitle.title ;
        oldDate.date= oldDate.date;
    }
    else if (newTitle ===null){
        oldTitle.title = oldTitle.title ;
        oldDate.date= oldDate.date;
    }
    else{
        oldTitle.title = newTitle ;
        oldDate.date= newDate;
        localStorageUpdate()
    }
    red();
}
function isDone(index){
    let isDone=tasks[index];
    isDone.isDone = !isDone.isDone ;
    localStorageUpdate()
    red()
}   
function localStorageUpdate(){
    localStorage.setItem("myTasks",JSON.stringify(tasks));
}