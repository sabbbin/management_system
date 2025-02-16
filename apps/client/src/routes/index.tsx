import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '../layout/base_layout';
import ProtectedRoute from './protected-route';
import { Dashboard } from '../pages/dashboard.page';
import LoginPage from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';


export const router= createBrowserRouter([
    {
        path:'/login',
        element: (
          <BaseLayout>
         <LoginPage />
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