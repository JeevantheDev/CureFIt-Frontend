import React, { useContext, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import AddLocation from '@material-ui/icons/AddLocation';
import MenuItem from '@material-ui/core/MenuItem';
import { FILTER_SECTION } from '../../app/entity/constant';
import { Box } from '@material-ui/core';
import { AppContext } from '../../app/app.context';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '30ch',
  },
  margin: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  rightSideFilter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 'auto',
  },
}));

export const FilterHeader = ({ history }) => {
  const classes = useStyles();

  const {
    routeState: [activeRoute],
    filterState: [publicFilterQuery, setPublicFilterQuery],
  } = useContext(AppContext);

  const getFilterParams = (queryParams) => {
    let res = queryParams.match(/[^?filter=]/i);
    if (res) {
      res = queryParams.slice(res.index);
    }
    return JSON.parse(decodeURIComponent(res));
  };

  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [experience, setExperience] = useState('all');
  const [specalists, setSpecalists] = useState('all');

  const isMount = React.useCallback(() => {
    let res = getFilterParams(history.location.search) ? true : false;
    return res;
  }, [getFilterParams(history.location.search)]);

  useEffect(() => {
    if (!isMount()) {
      setLocation('');
      setSearch('');
      setExperience('all');
      setSpecalists('all');
      setPublicFilterQuery({});
    } else {
      setLocation(getFilterParams(history.location.search).location);
      setSearch(getFilterParams(history.location.search).search);
      setExperience(
        getFilterParams(history.location.search).experience
          ? getFilterParams(history.location.search).experience
          : 'all'
      );
      setSpecalists(
        getFilterParams(history.location.search).specalists
          ? getFilterParams(history.location.search).specalists
          : 'all'
      );
    }
  }, [isMount()]);

  const inputLocation = useRef(null);
  const inputSearch = useRef(null);

  const handleSearchLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchField = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeExperience = (event) => {
    setExperience(event.target.value);
    setPublicFilterQuery({
      ...publicFilterQuery,
      experience: event.target.value,
    });
  };

  const handleChangeSpecalists = (event) => {
    setSpecalists(event.target.value);
    setPublicFilterQuery({
      ...publicFilterQuery,
      specalists: event.target.value,
    });
  };

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    if (document.activeElement === inputSearch.current) {
      setPublicFilterQuery({
        ...publicFilterQuery,
        search: search,
      });
    } else if (document.activeElement === inputLocation.current) {
      setPublicFilterQuery({
        ...publicFilterQuery,
        location: location.trim(),
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" my={2}>
      <Box display="flex" mr={'auto'} justifyContent="center" alignItems="center" flexWrap="wrap">
        <TextField
          inputRef={inputLocation}
          className={classes.margin}
          size="small"
          variant="outlined"
          color="secondary"
          id="input-with-icon-textfield"
          placeholder="search location"
          value={location}
          onChange={handleSearchLocation}
          onKeyUp={handleKeyEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddLocation color="secondary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          inputRef={inputSearch}
          className={classes.margin}
          size="small"
          variant="outlined"
          color="secondary"
          id="input-with-icon-textfield"
          placeholder="search doctors"
          value={search}
          onChange={handleSearchField}
          onKeyUp={handleKeyEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {activeRoute === CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES && (
        <div className={classes.rightSideFilter}>
          <TextField
            className={`${classes.menu} ${classes.margin}`}
            id="outlined-select-specalists"
            size="small"
            variant="outlined"
            color="secondary"
            select
            value={specalists}
            onChange={handleChangeSpecalists}
          >
            <MenuItem style={{ backgroundColor: '#fff' }} value={'all'}>
              By Specalists
            </MenuItem>
            {FILTER_SECTION.SPECALISTS.map((specalists) => (
              <MenuItem style={{ backgroundColor: '#fff' }} key={specalists} value={specalists}>
                {specalists}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={`${classes.menu} ${classes.margin}`}
            id="outlined-select-experience"
            size="small"
            variant="outlined"
            color="secondary"
            select
            value={experience}
            onChange={handleChangeExperience}
          >
            {FILTER_SECTION.EXPERIENCE.map((experience) => (
              <MenuItem style={{ backgroundColor: '#fff' }} key={experience.value} value={experience.value}>
                {experience.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}
    </Box>
  );
};
