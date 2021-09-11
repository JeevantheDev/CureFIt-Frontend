import React from 'react';
import { NavLink } from 'react-router-dom';
import { withBreadcrumbs } from '../../../app/hoc/withBreadcrumbs';
import { CONTAINER_ROUTES } from '../../../app/router/ApplicationRoutes';

const ProfileBreadcrumb = ({ match }) => <span>{match.params.slug}</span>; // use match param userId to fetch/display user name

const routes = [
  { path: CONTAINER_ROUTES.PUBLIC_CONTAINER, breadcrumb: 'Home' },
  { path: CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES, breadcrumb: 'Profiles' },
  { path: CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES_SLUG, breadcrumb: ProfileBreadcrumb },
  { path: 'something-else', breadcrumb: ':)' },
];

const BreadCrumbHeader = ({ breadcrumbs }) => {
  return (
    <div>
      {breadcrumbs.map(({ breadcrumb, path, match }) => (
        <span key={path}>
          <NavLink to={match.url}>{breadcrumb}</NavLink>
          <span>/</span>
        </span>
      ))}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default withBreadcrumbs(routes)(BreadCrumbHeader);

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export const BreadCrumbHeader = () => {
//   const classes = useStyles();

//   const handleClick = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className={classes.root}>
//       <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
//         <Link color="inherit" href="/" onClick={handleClick}>
//           Material-UI
//         </Link>
//         <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
//           Core
//         </Link>
//         <Typography color="textPrimary">Breadcrumb</Typography>
//       </Breadcrumbs>
//     </div>
//   );
// };
