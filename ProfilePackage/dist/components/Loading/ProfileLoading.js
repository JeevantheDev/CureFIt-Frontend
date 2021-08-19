"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileLoading = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Skeleton = _interopRequireDefault(require("@material-ui/lab/Skeleton"));

var _GlobalStyles = require("../GlobalStyles/GlobalStyles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)({
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 0',
    minWidth: '100%'
  }
});

var ProfileLoading = function ProfileLoading() {
  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, [1, 2, 3].map(function (n) {
    return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
      variant: "outlined",
      className: [classes.parent, (0, _GlobalStyles.GlobalStyles)().mb1],
      key: n
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      md: 5,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _GlobalStyles.GlobalStyles)().alignCenter
    }, /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
      variant: "circle",
      width: 250,
      height: 250
    }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      md: 6,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
      height: "20%",
      variant: "text"
    }), /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
      height: "20%",
      variant: "text"
    }), /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
      height: "20%",
      variant: "text"
    }), /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
      height: "20%",
      variant: "text"
    }), /*#__PURE__*/_react["default"].createElement(_Skeleton["default"], {
      height: "20%",
      variant: "text"
    })));
  }));
};

exports.ProfileLoading = ProfileLoading;