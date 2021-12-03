import { User } from "../models/User";

type UserProfileProps = {
	user: User;
};

export default function UserProfile({ user }: UserProfileProps) {
	return (
		<div className="box-center">
			<p>
				<i>{user.email}</i>
			</p>
		</div>
	);
}
