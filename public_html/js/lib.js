function Task(){
    
    this.mass;
    this.inp;
    
    /*
     * 
     * Проверка точно ли число
     * th - переданный объект в который вводим цифры
     * num -  проверяемое число
     */
    
    this.is_int = function(th,num){
        if(isFinite(num)){
            
            if(th.value[0]==0 && num===0) return false;
            
            if(th.value[0]=="-" && num===0)
                if(th.value[0]=="-" && num===0 && isFinite(parseInt(th.value[1]))) return true;
                else return false;
            
            return true;
            
        }else  return false;
    }  
    
    /*
     * проверяем вводимые символы
     * e - event
     * th - переданный объект в который вводим цифры
     * b - логическая переменная
     */
    
    this.number_up = function (e,th,b) {
        
        num=(String.fromCharCode(e.keyCode || e.charCode));
        
        if(b){
            if(th.value.length<=1){
                e.returnValue=this.is_int(th,parseInt(num));
            }else  e.returnValue=false;
        }else{        
            if((th.value.length===0)&&(num==="-")){
                e.returnValue=true;
            }else if(th.value.length<=9){
                e.returnValue=this.is_int(th,parseInt(num));
            }else  e.returnValue=false;     
        }
    }
    
    //строим таблицу для ввода чисел
    this.build_grid =  function(){
        count = document.getElementById('count');
        mass = document.getElementById('mass');
        if ((count.value!=0)&&(count.value!='')){
            while(mass.childNodes[0]){
                mass.removeChild(mass.childNodes[0]);
            }
            for(i=0;i<count.value;i++){
                input = document.createElement("input");
                input.setAttribute('type', 'text');
                input.setAttribute("onkeypress","obj.number_up(event,this,false)");
                input.setAttribute('placeholder','0');
                input.setAttribute('class','grid');
                mass.appendChild(input);
            }
            mass.appendChild(document.createElement("br"));
            div = document.createElement("div");
            div.setAttribute('id','random');
            div.setAttribute('class','btn');
            div.innerHTML='Автозаполнение';
            mass.appendChild(div);
            div = document.createElement("div");
            div.setAttribute('id','clear');
            div.setAttribute('class','btn');
            div.innerHTML='Очистить массив';
            mass.appendChild(div);
            div = document.createElement("div");
            div.setAttribute('id','sotr');
            div.setAttribute('class','btn');
            div.setAttribute('onclick','obj.sotr()');
            div.innerHTML='Сортировать';
            mass.appendChild(div);
            
            //получаем все input в элементе mass, а затем заносим все данные в массив data
            inp=mass.getElementsByTagName('input');
        }else{
            while(mass.childNodes[0]){
                mass.removeChild(mass.childNodes[0]);
            }
        }
    }
    
    
    //сортировка методом пузырька
    this.sotr =  function(){
        data=[];
        tmp=0;
        for (i = 0; i < inp.length; i++) {
            if((isNaN(parseInt(inp[i].value))||(inp[i].value=='-'))){
                data.push(0);
            }else data.push(parseInt(inp[i].value));
        }
        $("#before").text("До: ["+data+"]");
        //сортировка методом пузырька
        for (i = data.length - 1; i > 0; i--) {
            for (j = 0; j < i; j++) {
                if (data[j] > data[j+1]) {
                    tmp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = tmp;
                }
            }
        }
        $("#after").text("Результат: ["+data+"]");
        //выводим отсортированный массив в таблицу
        for (i = 0; i < inp.length; i++) {
            inp[i].value=data[i];
        }
        $("#result").show();
    }
    
    //заполняем таблицу рандомными значениями
    this.random = function(){
        for (i = 0; i < inp.length; i++) {
            inp[i].value=Math.floor(Math.random() * (100 - (-100)) + (-100));
        }
    }
    
    //очищаем содержимое таблицы
    this.ok_clear = function(){
        for (i = 0; i < inp.length; i++) {
            inp[i].value="";
        }
    }
    
    
}