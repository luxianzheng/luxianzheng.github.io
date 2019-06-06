var mycav = (function() {
    return {
        doInit(target) {
            let c = document.querySelector(target);
            let ctx = c.getContext("2d");
        
            //获取画布宽高
            const WIDTH = c.width;
            const HEIGHT = c.height;
        
            //定义圆心，半径
            let left_x = WIDTH / 4;
            let left_y = HEIGHT / 2;
            let right_x = WIDTH / 4 * 3;
            let right_y = HEIGHT / 2;
            let r = HEIGHT / 2;
            
            //画开关函数 传入此时状态值和白色开关圆横坐标
            function doDrawing(statu , flag_x) {
                ctx.clearRect(0 , 0 , WIDTH , HEIGHT);
                //画两个圆 一个矩形
                ctx.beginPath();
                ctx.fillStyle = c.getAttribute(statu);
                ctx.arc(left_x , left_y , r , 0 , 2 * Math.PI);
                ctx.fill();
        
                ctx.beginPath();
                ctx.fillStyle = c.getAttribute(statu);
                ctx.arc(right_x , right_y , r , 0 , 2 * Math.PI);
                ctx.fill();
        
                ctx.beginPath();
                ctx.fillStyle = c.getAttribute(statu);
                ctx.rect(r , 0 , WIDTH / 2 , HEIGHT);
                ctx.fill();
        
                //画一个白色背景圆表示开关
                ctx.beginPath();
                ctx.fillStyle = c.getAttribute("circle");
                ctx.arc(flag_x , right_y , r - r * 0.05 , 0 , 2 * Math.PI);
                ctx.fill();
            };
        
            //页面加载默认开关状态
                doDrawing(c.getAttribute("status") , right_x);
        
            //开关点击事件
            c.onclick = function() {
                //判断此时开关是开还是关
                if(c.getAttribute("status") == "on") {
                    c.setAttribute("status" , "off");
        
                    let cur_right_x_on =  right_x;
        
                    //计时器做动画 从开到关
                    let timer_on = setInterval(function() {
        
                        //判断动画停止时间
                        if(cur_right_x_on == r) {
                            clearInterval(timer_on);
                        }
        
                        doDrawing("off" , cur_right_x_on);
        
                        cur_right_x_on = cur_right_x_on - r / 8;
        
                    } , 10)
        
                } else {
                    c.setAttribute("status" , "on");
        
                    let cur_right_x_off = r;
        
                    //计时器做动画 从关到开
                    let timer_off = setInterval(function() {
        
                        //判断动画停止时间
                        if(cur_right_x_off == r * 3) {
                            clearInterval(timer_off);
                        }
        
                        doDrawing("on" , cur_right_x_off);
        
                        cur_right_x_off = cur_right_x_off + r / 8;
        
                    } , 10);
                }
            }
        }
    };
})();
