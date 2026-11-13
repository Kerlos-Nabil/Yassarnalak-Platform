import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Role } from '../data/signup';
import { homePathFor, useAuth } from './AuthContext';

interface RequireAuthProps {
  roles: Role[];
  /** doctors / specialists must be approved by the admin first */
  approvedOnly?: boolean;
  children: React.ReactElement;
}

export function RequireAuth({ roles, approvedOnly, children }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!roles.includes(user.role)) return <Navigate to={homePathFor(user)} replace />;
  if (approvedOnly && user.role !== 'parent' && user.status !== 'approved') return <Navigate to="/pending" replace />;
  return children;
}

/** Login / signup pages: if already signed in, go to the user's own home. */
export function GuestOnly({ children }: {children: React.ReactElement;}) {
  const { user } = useAuth();
  if (user) return <Navigate to={homePathFor(user)} replace />;
  return children;
}
