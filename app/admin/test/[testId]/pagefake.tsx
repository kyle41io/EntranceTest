import { useRouter } from 'next/router';
import axios from 'axios';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';

function TestDetail() {
  const router = useRouter();
  const { testId } = router.query;
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (testId) {
      axios.get(`https://localhost:5433/api//Tests/{testId}`).then(response => {
        setTest(response.data);
      });
    }
  }, [testId]);

  if (!test) {
    return <div>Loading...</div>;
  }

  return (<></>
  )
}
