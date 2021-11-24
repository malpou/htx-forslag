import Head from "next/head";

type MetatagsProps = {
	title: string;
	description: string;
};

export default function Metatags({ title, description }: MetatagsProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
		</Head>
	);
}
