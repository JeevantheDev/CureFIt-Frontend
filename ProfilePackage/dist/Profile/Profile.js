"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Star = _interopRequireDefault(require("@material-ui/icons/Star"));

var _GlobalStyles = require("../components/GlobalStyles/GlobalStyles");

var _ProfileLoading = require("../components/Loading/ProfileLoading");

var _theme = _interopRequireDefault(require("../utils/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)({
  profileParent: {
    minWidth: '100%',
    flexWrap: 'wrap',
    padding: '1rem 0',
    backgroundColor: _theme["default"].palette.background.paper
  }
});

var Profile = function Profile(props) {
  var profile = props.profile,
      _props$horizontal = props.horizontal,
      horizontal = _props$horizontal === void 0 ? true : _props$horizontal,
      isLoading = props.isLoading;
  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 3
  }, isLoading && /*#__PURE__*/_react["default"].createElement(_ProfileLoading.ProfileLoading, null), !isLoading && profile && /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
    style: {
      display: horizontal ? 'flex' : ''
    },
    variant: "outlined",
    className: "".concat(classes.profileParent, "  ").concat((0, _GlobalStyles.GlobalStyles)().mb1)
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    className: !horizontal ? "".concat((0, _GlobalStyles.GlobalStyles)().mb2) : '',
    item: true,
    md: !horizontal ? 12 : 6,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _GlobalStyles.GlobalStyles)().alignCenter
  }, /*#__PURE__*/_react["default"].createElement(_Avatar["default"], {
    variant: "circle",
    className: (0, _GlobalStyles.GlobalStyles)().avatar,
    src: profile.user.avatar
  }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    md: !horizontal ? 12 : 6,
    xs: 12,
    className: (0, _GlobalStyles.GlobalStyles)().mYAuto
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: !horizontal ? 'center' : 'start'
  }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    className: "".concat((0, _GlobalStyles.GlobalStyles)().ml1, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
    color: "textPrimary",
    variant: "h5",
    gutterBottom: true
  }, profile.user.user_name), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    color: "textSecondary",
    className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, " ").concat((0, _GlobalStyles.GlobalStyles)().textUpper, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
    gutterBottom: true
  }, profile.specializations.join(',')), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    color: "textSecondary",
    className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
    gutterBottom: true
  }, profile.total_experience, " years experience overall."), profile.reviews.length > 0 && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    display: "flex",
    ml: 2,
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Chip["default"], {
    className: (0, _GlobalStyles.GlobalStyles)().greenBackground,
    label: profile.average_rating,
    icon: /*#__PURE__*/_react["default"].createElement(_Star["default"], {
      style: {
        color: '#fff'
      }
    })
  }))))), !isLoading && !profile && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement("p", null, "No Profile Found...")));
};

Profile.propTypes = {
  profile: _propTypes["default"].object.isRequired,
  isLoading: _propTypes["default"].bool.isRequired,
  horizontal: _propTypes["default"].bool
};
var _default = Profile;
exports["default"] = _default;