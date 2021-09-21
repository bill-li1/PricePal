import { Loading } from 'components/Loading';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoadingPage() {
  const { query } = useRouter();
  useEffect(() => {
    if (query.redirectToGroup) {
      router.push(`/Group/${query.redirectToGroup}`);
    }
  });
  return <Loading />;
}
