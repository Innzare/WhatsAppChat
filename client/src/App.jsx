import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'Src/routes';
import './App.scss';

export const App = () => {
  return (
    <Routes>
      {ROUTES.map((route) => {
        const { path, index, component: RouteComponent } = route;

        return <Route key={path} path={path} index={index} element={<RouteComponent />} />;
      })}
    </Routes>
  );
};
