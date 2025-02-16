import { Navigate} from 'react-router-dom';
import { useLoginSessionStore } from '../store/login-session-store';


export interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const [loginState] = useLoginSessionStore((state) => [
		state.loginState,
		state.login,
		state.logout,
	]);

	if (loginState === 'loggedIn') {
		return <>{children} </>;
	}
	return <Navigate to="/login" replace />;
}

export default ProtectedRoute;