import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '../layout/base_layout';
import ProtectedRoute from './protected-route';
import { Dashboard } from '../pages/dashboard.page';
import AdminLoginPage from '../pages/admin-login-page';
import { RegisterPage } from '../pages/admin-register-page';
import UserLoginPage from '../pages/user-login-page';


export const router= createBrowserRouter([
    {
        path:'/admin/login',
        element: (
          <BaseLayout>
         <AdminLoginPage />
          </BaseLayout>   
        )
    },
     {
        path:'/login',
        element: (
          <BaseLayout>
         <UserLoginPage/>
          </BaseLayout>   
        )
    },
     {
         path:'/signup',
        element: (
          <BaseLayout>
          <RegisterPage />
          </BaseLayout>   
        )
     },
    {
        path: '*',
        element: <BaseLayout />,
       
    },
     {

         path: '/',
         element: (
            //  <ProtectedRoute>
				<BaseLayout />
			// </ProtectedRout
            // e>
		),
		children: [
            {
                path: '/',
				element: <Dashboard />,
			},
        ]}
    
    ])