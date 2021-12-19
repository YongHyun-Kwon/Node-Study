/* eslint-disable*/
// 여기서 Node에게 파일을 읽어달라 요청하고, 워커 스레드에서 파일을 읽기 시작한다.
fs.readFile(fileName, (err, data) => {
  // Node가 파일을 다 읽고 나면
  // 1. callback queue에 이 함수의 err, data 인자를 채워 넣고
  // 2. callback queue에서 꺼내질 때 이 부분이 실행된다.
})
// readfile의 호출이 끝난 직후 바로 이 함수를 실행하게 된다.
// 이는 여전히 같은 콜백을 처리 중이기 때문이다.
someTask()
/*    위 예시 코드와 같이 브라우저나 Node.js에서나, Web API 혹은 Node API의 동작이 끝나면 callback queue에 등록한다. 브라우저나 Node가 요청 받은 일을 하고 있는 동안 메인 스레드와 이벤트 루프는 영향을 받지 않고 계속 실행된다.
    이를 offloading이라고 하며, Node 서버의 메인 스레드가 하나임에도 불구하고 빠르게 동작할 수 있는 이유이다.
    메인 스레드는 오래 걸리는 일을 기다리지 않기 때문이다.
*/
