import { User } from "../models/User";

type UserProfileProps = {
	user: User;
};

export default function UserProfile({ user }: UserProfileProps) {
	return (
		<div className="box-center">
			<img src={user.photoUrl} className="card-img-center" />
			<p>
				<i>@{user.username}</i>
			</p>
			<h1>{user.displayName}</h1>
		</div>
	);
}
