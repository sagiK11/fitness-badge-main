import Head from "next/head";

export interface SeoMetadataProps {
  title?: string;
  description?: string;
}

export function SeoMetadata({
  title = "Fitness Admin",
  description = "",
}: SeoMetadataProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
    </Head>
  );
}
