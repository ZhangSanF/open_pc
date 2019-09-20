let websock = null;
let global_callback = null;
let serverPort = ''; // 连接端口
let curUrl = ''


export const initWebSocket=(wsurl)=>{
    curUrl = wsurl;
    websock = new WebSocket(wsurl);
    websock.onmessage = (e)=>{
        webSocketOnMessage(e);
    };
    websock.onclose = (e)=>{
        webSocketClose(e)
    };
    websock.onopen = ()=>{
        webSocketOpen();
    }

    // 连接失败回调
    websock.onerror = ()=>{
        console.log('webSocket连接发生错误');
        setTimeout(()=>{
            initWebSocket(wsurl);
        },1000);
        
    }
}

// 实际调用
export const sendSock =(agentData,callback)=>{
    global_callback = callback;
    if(websock.readyState === websock.OPEN){
        // 如果是开启状态
        webSocketSend(agentData);
    }else if(websock.readyState === websock.CONNECTIONG){
        // 若是正在连接状态 则等待一秒后调用
        setTimeout(()=>{
            sendSock(agentData,callback);
        },1000);
    }else{
        // 若是未状态 则等待一秒后调用
        setTimeout(()=>{
            sendSock(agentData,callback);
        },1000);
    }
}

// 数据接收
export const webSocketOnMessage = (e)=>{
    global_callback(JSON.parse(e.data));
}

// 数据发送
export const webSocketSend =(agentData)=>{
    websock.send(JSON.stringify(agentData));
}

// 关闭
export const webSocketClose = (e)=>{
    initWebSocket(curUrl);
    console.log(`connection closed (${e.code})`);
}

// 连接成功
export const webSocketOpen = (e)=>{
    console.log('连接成功');
}
