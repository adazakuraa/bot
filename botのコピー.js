//問題文と答えを格納する配列
let d=[];


//配列をシャッフルする
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//csvファイルの読み込み => データを多次元配列に格納
function init(){
　　csv_read("csv/quiz_bot.csv");
};

//csvファイルを読み込み
function csv_read(csv_path)
{
    const spinner = document.getElementById('loading');
    fetch(csv_path)
    .then((res) => {
        if(!res.ok) {
            console.log('正常にリクエストを処理できませんでした。');
        }
        return res.text();
    })
    .then((csv_data) => {
            let b =csv_data.split('\r\n');
            d=[];
            for(let i = 0; i<b.length; i++){
                let c =b[i].split(',');
                d.push(c);
                d=shuffle(d);
                spinner.classList.add('loaded');
            }
	    create_bot();
    })
    .catch((error) => {
        console.log('エラーが発生しました。');
    })
}

//リストを生成する
function create_bot(){
    console.log("リストを生成");
    count=0;
    var bot=document.getElementById("bot");

    for (var n=0;n<d.length;n++){
        var di=document.createElement("div")
        var sp=document.createElement("button");
        var p=document.createElement("p");
        var preid="i"+n
        di.className="box28"
        di.setAttribute("data-lightbox", "center");
        sp.className="box-title"
        sp.setAttribute("onclick","ans(this)")
        sp.id=preid;
        sp.innerHTML="？";
        bot.appendChild(di);
        if(d[n][0].indexOf("画像付き")!=-1){
            var st=d[n][0].replace("画像付き。","");
            p.innerHTML=st+"<br>";
            var im=document.createElement("img");
            im.src=d[n][2];
            im.height=200;
            di.append(sp,p,im);
        }
        else{
            p.innerHTML=d[n][0];
            di.append(sp,p);
        }
        
    }
}

//答えの表示・非表示を切り替える
var c=0;
function ans(thi){
    if(c==0){
        var a=document.getElementById(thi.id);
        var str=thi.id.slice(1)
        a.innerHTML=d[str][1];
        c=1;
    }
    else{
        var a=document.getElementById(thi.id);
        var str=thi.id.slice(1)
        a.innerHTML="？";
        c=0; 
    }

}

//全問題の答えの表示・非表示を切り替える
var e=0;
function change(){
    for (var n=0;n<d.length;n++){
        var preid="i"+n
        var a=document.getElementById(preid);
        if(e==0){
            a.innerHTML=d[n][1];
        }
        else{
            a.innerHTML="？";
        }
    }
    if(e==0){
        e=1;
    }
    else{
        e=0;
    }
}
