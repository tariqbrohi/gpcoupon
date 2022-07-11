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
  const paths = [{ params: { site: 'admin' } }];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, PathProps> = async ({
  params,
}) => {
  if (!params) throw new Error('No path parameters found');

  const data = [{ domain: 'admin', data: 'My first admin project' }];
  console.log(params, ' params');
  const project = data.find((p) => p.domain === params.site);
  console.log('project ', project);

  return {
    props: {},
  };
};
