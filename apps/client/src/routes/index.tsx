import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';
import { BaseLayout } from '../layout/base_layout';
import ProtectedRoute from './protected-route';
import { Dashboard } from '../pages/dashboard.page';


const router= createBrowserRouter([
    {
        path:'/login',
        element:<LoginPage />
    },
  
     {
    path: '/',
		element: (
			<ProtectedRoute>
				<BaseLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: '/',
				element: <Dashboard />,
			},
        ]}
])


export function Routes() {
	return <RouterProvider router={router} />;
}