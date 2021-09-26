import React from 'react';
import { matchPath, useLocation, withRouter } from 'react-router-dom';

const flattenRoutes = (routes) =>
  routes.reduce((arr, route) => {
    if (route.routes) {
      return arr.concat([route, ...flattenRoutes(route.routes)]);
    }
    return arr.concat(route);
  }, []);

const renderer = ({ breadcrumb, match }) => {
  if (typeof breadcrumb === 'function') {
    return breadcrumb({ match });
  }
  return breadcrumb;
};

export const getBreadcrumbs = ({ routes, location }) => {
  const matches = [];
  const { pathname } = location;
  pathname
    .split('?')[0]
    .split('/')
    .reduce((previous, current, index) => {
      // console.log('here 2', current);
      const pathSection = !current ? '/' : `${previous}/${current}`;

      // if (pathSection === '/' && index !== 0) {
      //   return '';
      // }
      let breadcrumbMatch;

      routes.some(({ breadcrumb, path }) => {
        const match = matchPath(pathSection, { exact: true, path });

        if (match) {
          breadcrumbMatch = {
            breadcrumb: renderer({ breadcrumb, match }),
            path,
            match,
          };
          return true;
        }

        return false;
      });

      if (breadcrumbMatch) {
        matches.push(breadcrumbMatch);
      }

      return pathSection;
    });
  return matches;
};

export const withBreadcrumbs = (routes) => (Component) =>
  withRouter((props) => (
    <Component
      {...props}
      breadcrumbs={getBreadcrumbs({
        routes: flattenRoutes(routes || []),
        location: useLocation(),
      })}
    />
  ));
