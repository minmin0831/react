import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  }); // windowSize는 객체 타입으로 저장한다. 

  // useEffect는 로딩 시 한번만 실행된다. 
  useEffect(() => {

    const handleResize = () => {
      setWindowSize({ // 로딩 시 window의 width와 height를 트래킹하여 
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    handleResize(); // state에 저장한다. 

    window.addEventListener("resize", handleResize);

    // resize 이벤트가 발생하면 handleResize 함수를 재호출 한다. 이것이 가능한 이유는 window 단에서 이벤트를 감지할 수 있도록 하였기 때문이다. 이벤트가 감지되면 handleResize 함수가 또 다시 반복 호출된다. 

    /*
    const cleanUp = () => {
      console.log('runs if useEffect dependancy changes');
      window.removeEventListener("resize", handleResize);
    }
    // memory leak를 방지하기 위해 cleanUp 함수를 호출하여 EventListener를 제거한다. 
    // 

    return cleanUp; // cleanUp를 반환하는 이유는 cleanUp을 호출하기 위함이다. 
    */

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return windowSize; // useWindowSize 함수를 호출하면 windowSize 값을 얻도록 한다. 
}

export default useWindowSize;