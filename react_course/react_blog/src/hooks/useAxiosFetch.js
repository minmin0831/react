// 해당 custom hook는 다른 프로젝트에 pull in 하여 사용해도 된다. 
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => { // App.js에서 importing. http://localhost:3500/posts를 인자로 useAxiosFetch()함수를 호출한다. 
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { // 컴파일 시 함수들은 따로 선언된다. 함수 내 변수에는 값이 메겨지고 함수 내 함수는 실행은 안되고 등록만 되어진다. 
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        // cancelToken을 response로 갖고 있다가

        if (isMounted) { // 해당 useEffect가 호출될 경우 위에서 선언한 response의 data를 setData 함수를 통해 data에 저장한다. 
          setData(response.data);
          setFetchError(null); // 발생한 에러가 없으니, fetchError 값으로 null 그대로 저장해놓는다. (안해도 되지만 확실하게 하기 위해 코딩함.)
        }

      } catch (err) {

        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }

      } finally {
        isMounted && setIsLoading(false);
      }
    }

    fetchData(dataUrl); // 컴파일 시 등록된 함수를 호출한다. 호출은 등록 이후에 이루어진다. 때문에 컴포넌트가 로딩 된 후 마지막으로 useEffect를 실행하는데 실행 순서는 변수 내 값이 메겨짐과 동시에 fetchData를 호출하여 fetchData 함수를 기동한다.  

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }
    // 그 다음에 cleanUp 함수가 반환되어 useEffect 함수 수행이 마무리된다. 

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading }; // 해당 컴포넌트는 최종적으로 세팅된 data, fetchError, isLoading 정보를 반환한다. 
}

export default useAxiosFetch;