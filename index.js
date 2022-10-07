var clock = null;
var score = 0;
var speed = 4;
var flag = false;

//创建div className是其类名 
function creatediv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

//根据id来获取元素
function $(id) {
    return document.getElementById(id);
}

//开始游戏
function start() {  
    if (!flag) {
        init();
    } else {
        alert('游戏已经开始，无须再次点击！');
    }
}

//初始化函数
function init() {
    //创建新行
    flag = true;
    speed = 4;
    for (var i = 0; i < 4; i++) {
        createrow();
    }
    //定时器 每30毫秒调用一次下移函数move()
    clock = window.setInterval('move()', 30);
    //添加onclick事件 判断是否点击
    $('main').onclick = function (ev) {
        judge(ev);
    };
}

// 创建新行 div→con→row→cell
function createrow() {
    var con = $('con');         //获取con
    var row = creatediv('row'); //创建div className=row
    var arr = createcell();     //定义cell的类名
    con.appendChild(row);       //添加row为con的子节点

    for (var i = 0; i < 4; i++) {
        row.appendChild(creatediv(arr[i])); //添加row的子节点
    }

    if (con.firstChild == null) {  
        con.appendChild(row);
    }
    else {
        con.insertBefore(row, con.firstChild); //在con第一个节点前插入row
    }
}

//创建块的数组 一个为cell black 其余为cell
function createcell() {
    var temp = ['cell', 'cell', 'cell', 'cell'];
    var i = Math.floor(Math.random() * 4); //随机产生黑块的位置
    temp[i] = 'cell black';
    return temp;
}

//下移 让黑块动起来
function move(){
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con, null)['top']);

    if(top < 0){
        top += speed;
    }            
    if(top + speed >= 0){
        createrow();
        top = -100;
    }
    con.style.top = top + 'px';  //不断移动top值，使它动起来

    var rows = con.childNodes;
    if(rows.length > 4){
        //删除某行
        if(rows.length == 7){  
                con.removeChild(con.lastChild);  
        }
        //游戏是否结束
        if(rows[4].pass !== 1 && top == -100 + speed){
            fail();
        }
        else {
            pass;
        }
    }
}

// 判断是否点击黑块、白块
function judge(event){
    if(event.target.className.indexOf('black') == -1){
        fail();  //点击到不是黑块 游戏结束
    }else{
        event.target.className = 'cell';   //变为白色
        event.target.parentNode.pass = 1;  //定义属性pass 表明该行黑块已经被点击
        score += 1;
        document.getElementById('score').innerHTML=score;
        speedup();
    }
}

//加速函数
function speedup(){
    if(score >= 10 && score % 10 == 0){
        speed += 2;
    }
}

// 游戏结束
function fail(){
    clearInterval(clock);
    flag = false;
    confirm('游戏结束!' + '\n' + '你的最终得分为: ' + score);
    score = 0;
    var con = $('con');
    con.innerHTML = '';
    $('score').innerHTML = score;
    con.style.top = '-408px';       
}



