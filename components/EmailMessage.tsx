type EmailMessageProps = {
	email: string;
	isValid: boolean;
	loading: boolean;
};

export default function EmailMessage({
	email,
	isValid,
	loading,
}: EmailMessageProps) {
	if (loading) {
		return <p>Checking...</p>;
	} else if (isValid) {
		return <p className="text-success">{email} is available!</p>;
	} else if (email && !isValid) {
		return <p className="text-danger">That email is taken!</p>;
	} else {
		return <p></p>;
	}
}
