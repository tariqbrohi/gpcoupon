import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

interface PathProps extends ParsedUrlQuery {
  site: string;
}

export default function Index() {
  const router = useRouter();

  return (
    <div>
      <img src="/images/all.jpg" />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  const paths = [{ params: { site: 'abc' } }];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, PathProps> = async ({
  params,
}) => {
  if (!params) throw new Error('No path parameters found');
  console.log(params);
  return {
    props: {},
  };
};
