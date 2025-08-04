import { getIsAuthChecked, getUser } from '@/services/store/user/reducers';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import Spinner from '../spinner/spinner';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

type TLocationState = {
  from: {
    pathname: string;
  };
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: TProtectedRoute): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  const locationState = location.state as TLocationState;

  if (!isAuthChecked) {
    return <Spinner />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = locationState ?? { from: { pathname: '/' } };
    return <Navigate to={from?.pathname} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
