import { makeStyles } from '@material-ui/core/styles';

export const GlobalStyles = makeStyles({
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 0',
    minWidth: '100%',
  },
  avatar: {
    width: 250,
    height: 250,
    objectFit: 'contain',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mYAuto: {
    margin: 'auto 0',
  },
  mb1: {
    marginBottom: '1rem',
  },
  mb2: {
    marginBottom: '2rem',
  },
  ml1: {
    marginLeft: '1rem',
  },
  subText: {
    fontWeight: '300',
    fontSize: '20px',
    lineHeight: '23px',
    letterSpacing: '0.07em',
    marginLeft: '1rem',
  },
  textUpper: { textTransform: 'uppercase' },
  fontBold: {
    fontWeight: '700 !important',
  },
  hoverUnderline: {
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
  },
  textUnderline: {
    textDecoration: 'underline',
  },
  greenBackground: {
    backgroundColor: '#0EAC27',
    color: '#fff',
  },
  greenText: {
    color: '#0EAC27',
    letterSpacing: '0.07rem',
  },
});
