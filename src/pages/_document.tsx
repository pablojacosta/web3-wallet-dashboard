import { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter';

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  const descriptionText = 'A web application for wallet interaction';
  const bannerImage = '';

  return (
    <Html lang='en'>
      <Head>
        <DocumentHeadTags {...props} />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='description' content={descriptionText} />

        <meta property='og:title' content='Wallet Dashboard' />
        <meta property='og:description' content={descriptionText} />
        <meta name='twitter:image' content={bannerImage} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@Wallet_Dashboard' />
        <meta name='twitter:creator' content='@Wallet_Dashboard' />
        <meta name='twitter:title' content='Wallet Dashboard' />
        <meta name='twitter:description' content={descriptionText} />

        <meta name='twitter:image' content={bannerImage} />

        {/* To prevent all search engines from indexing */}
        <meta name='robots' content='noindex' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
